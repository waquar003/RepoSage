import { Controller, HttpCode, Post } from '@nestjs/common';
import { StorageService } from './storage.service';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';

@Controller('storage')
export class StorageController {
    constructor(private readonly storageService: StorageService) {}

    @Post('signature')
    @HttpCode(200)
    @ResponseMessage('Clodinary upload signature generated')
    getSignature() {
        return this.storageService.getSignature();
    }
}
