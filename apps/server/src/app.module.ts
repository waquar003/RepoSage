import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StorageModule } from './storage/storage.module';
import { TranscriptionModule } from './transcription/transcription.module';
import { DatabaseModule } from './database/database.module';
import { QueueModule } from './queue/queue.module';
import { MeetingsModule } from './meetings/meetings.module';
import { BillingModule } from './billing/billing.module';

@Module({
    imports: [
        StorageModule,
        TranscriptionModule,
        DatabaseModule,
        QueueModule,
        MeetingsModule,
        BillingModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
