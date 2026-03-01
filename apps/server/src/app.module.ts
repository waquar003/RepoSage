import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StorageModule } from './storage/storage.module';
import { TranscriptionModule } from './transcription/transcription.module';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [StorageModule, TranscriptionModule, DatabaseModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
