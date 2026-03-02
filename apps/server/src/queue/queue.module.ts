import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { BullModule } from '@nestjs/bullmq';
import { TranscriptionModule } from '../transcription/transcription.module';
import { TranscriptionProcessor } from './worker/transcription.processor';

@Module({
    imports: [
        BullModule.forRoot({
            connection: {
                host: process.env.REDIS_HOST,
                port: parseInt(process.env.REDIS_PORT!, 10),
            },
        }),
        BullModule.registerQueue({
            name: 'transcription-queue',
        }),
        TranscriptionModule,
    ],
    providers: [QueueService, TranscriptionProcessor],
    exports: [QueueService],
})
export class QueueModule {}
