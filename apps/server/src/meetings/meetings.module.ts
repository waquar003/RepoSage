import { Module } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { MeetingsController } from './meetings.controller';
import { QueueModule } from 'src/queue/queue.module';
import { TranscriptionModule } from 'src/transcription/transcription.module';

@Module({
    imports: [QueueModule, TranscriptionModule],
    providers: [MeetingsService],
    controllers: [MeetingsController],
})
export class MeetingsModule {}
