import { Module } from '@nestjs/common';
import { ApiKeysService } from './api-keys.service';
import { ApiKeysController } from './api-keys.controller';
import { EncryptionService } from '../common/services/encryption.service';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [ApiKeysController],
    providers: [ApiKeysService, EncryptionService],
    exports: [ApiKeysService],
})
export class ApiKeysModule {}
