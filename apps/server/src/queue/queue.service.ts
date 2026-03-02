import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
    constructor(@InjectQueue('transcription-queue') private readonly transcriptionQueue: Queue) {}

    async addTranscriptionJob(meetingId: string, recordingUrl: string) {
        await this.transcriptionQueue.add(
            'transcribe',
            { meetingId, recordingUrl },
            {
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 5000,
                },
                removeOnComplete: true,
            },
        );

        return { success: true, message: 'Transcription job added to the queue' };
    }
}
