import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { GithubSyncJob } from '@reposage/types';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
    constructor(
        @InjectQueue('transcription-queue') private readonly transcriptionQueue: Queue,
        @InjectQueue('github-sync-queue') private readonly githubSyncQueue: Queue,
    ) {}

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

    async addGithubSyncJob(data: GithubSyncJob) {
        await this.githubSyncQueue.add('sync-github', data, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 5000,
            },
            removeOnComplete: true,
        });

        return { success: true, message: 'Github sync job added to the queue' };
    }
}
