import { Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { StorageService } from './storage.service';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('storage')
export class StorageController {
    constructor(private readonly storageService: StorageService) {}

    @Post('signature')
    @UseGuards(AuthGuard)
    @HttpCode(200)
    @ResponseMessage('Clodinary upload signature generated')
    getSignature() {
        return this.storageService.getSignature();
    }
}
