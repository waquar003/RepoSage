import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StorageModule } from './storage/storage.module';
import { TranscriptionModule } from './transcription/transcription.module';

@Module({
  imports: [StorageModule, TranscriptionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
