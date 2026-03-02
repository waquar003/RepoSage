import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { QueueService } from 'src/queue/queue.service';
import { TranscriptionService } from 'src/transcription/transcription.service';

@Injectable()
export class MeetingsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly queueService: QueueService,
        private readonly transcriptionService: TranscriptionService,
    ) {}

    async processNewMeeting(projectId: string, name: string, meetingUrl: string) {
        const meeting = await this.prisma.meeting.create({
            data: {
                projectId,
                name,
                meetingUrl,
                status: 'PROCESSING',
            },
        });

        await this.queueService.addTranscriptionJob(meeting.id, meetingUrl);

        return meeting;
    }

    async handleTranscriptionComplete(
        meetingId: string,
        payload: { transcript_id: string; status: 'completed' | 'error' },
    ) {
        const meeting = await this.prisma.meeting.findUnique({
            where: {
                id: meetingId,
            },
        });
        if (!meeting) throw new NotFoundException('Meeting not found');

        if (payload.status === 'error') {
            await this.prisma.meeting.update({
                where: { id: meetingId },
                data: { status: 'FAILED' },
            });

            return { success: true, message: 'Meeting transcription failed and status updated' };
        }

        if (payload.status === 'completed') {
            const transcriptData = await this.transcriptionService.getTranscript(
                payload.transcript_id,
            );

            await this.prisma.$transaction(async (tx) => {
                await tx.meeting.update({
                    where: { id: meetingId },
                    data: {
                        status: 'COMPLETED',
                        globalSummary: transcriptData.summary ?? 'Summary not available',
                        entities: transcriptData.entities ?? [],
                    },
                });

                if (transcriptData.utterances && transcriptData.utterances.length > 0) {
                    const utteranceData = transcriptData.utterances.map((u) => ({
                        meetingId,
                        speaker: u.speaker ? `Speaker ${u.speaker}` : 'Unknown',
                        text: u.text,
                        start: u.start,
                        end: u.end,
                    }));
                    await tx.utterance.createMany({ data: utteranceData });
                }

                if (transcriptData.chapters && transcriptData.chapters.length > 0) {
                    const issueData = transcriptData.chapters.map((c) => ({
                        meetingId,
                        start: c.start.toString(),
                        end: c.end.toString(),
                        gist: c.gist,
                        headline: c.headline,
                        summary: c.summary,
                    }));
                    await tx.issue.createMany({ data: issueData });
                }
            });

            return { success: true, message: 'Meeting processed successfully' };
        }

        return { success: false, message: 'Received unknown transcription status' };
    }
}
