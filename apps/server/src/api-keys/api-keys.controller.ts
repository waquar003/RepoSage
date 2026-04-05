import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    RawBodyRequest,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ApiKeysService } from './api-keys.service';
import { AuthenticatedRequest } from 'src/common/types';

@Controller('api-keys')
@UseGuards(AuthGuard)
export class ApiKeysController {
    constructor(private readonly apiKeysService: ApiKeysService) {}

    @Post()
    async create(
        @Req() request: RawBodyRequest<AuthenticatedRequest>,
        @Body() body: { name: string; provider: 'GEMINI' | 'ASSEMBLYAI'; key: string },
    ) {
        return this.apiKeysService.saveKey(request.userId, body);
    }

    @Get()
    async findAll(@Req() request: RawBodyRequest<AuthenticatedRequest>) {
        const keys = await this.apiKeysService.findAll(request.userId);
        return keys.map((k) => ({ ...k, key: '........' }));
    }

    @Delete(':id')
    async remove(@Req() request: RawBodyRequest<AuthenticatedRequest>, @Param('id') id: string) {
        return this.apiKeysService.deleteKey(request.userId, id);
    }

    @Get(':id')
    async getDecreptedKey(
        @Req() request: RawBodyRequest<AuthenticatedRequest>,
        @Param('id') id: string,
    ) {
        return this.apiKeysService.getDecryptedKey(id, request.userId);
    }
}
