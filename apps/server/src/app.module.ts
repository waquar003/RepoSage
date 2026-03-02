import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StorageModule } from './storage/storage.module';
import { TranscriptionModule } from './transcription/transcription.module';
import { DatabaseModule } from './database/database.module';
import { QueueModule } from './queue/queue.module';

@Module({
    imports: [StorageModule, TranscriptionModule, DatabaseModule, QueueModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
