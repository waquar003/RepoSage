import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { TranscriptionService } from 'src/transcription/transcription.service';

@Processor('transcription-queue')
export class TranscriptionProcessor extends WorkerHost {
    constructor(private readonly transcriptionService: TranscriptionService) {
        super();
    }

    async process(job: Job<{ meetingId: string; recordingUrl: string }>): Promise<any> {
        try {
            await this.transcriptionService.submitTranscriptionJob(
                job.data.recordingUrl,
                `${process.env.SERVER_BASE_URL}/webhooks/transcription/${job.data.meetingId}`,
            );

            return {
                success: true,
                message: `Submitted transcription job to transcription service provider successfully with recording URL: ${job.data.recordingUrl} and meeting Id: ${job.data.meetingId}`,
            };
        } catch (error) {
            console.error('Error processing transcription job: ', error);
            throw error;
        }
    }
}
