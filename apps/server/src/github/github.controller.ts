import {
    Controller,
    Post,
    Body,
    Param,
    UseGuards,
    Req,
    RawBodyRequest,
    UnauthorizedException,
    Headers,
    HttpCode,
} from '@nestjs/common';
import { GithubService } from './github.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { FastifyRequest } from 'fastify';

@Controller('github')
@UseGuards(AuthGuard)
export class GithubController {
    constructor(
        private githubService: GithubService,
        private readonly prisma: PrismaService,
    ) {}

    @Post('sync/:projectId')
    @ResponseMessage('Commit synchronization started')
    async syncCommits(
        @Param('projectId') projectId: string,
        @GetUser() userId: string,
        @Body('hashes') hashes: string[],
    ) {
        return this.githubService.syncGithubData(projectId, userId, hashes);
    }

    @Post('webhook/github')
    @HttpCode(200)
    @ResponseMessage('received the webhook')
    async handleGithubWebhook(
        @Headers('x-hub-signature-256') signature: string,
        @Req() req: RawBodyRequest<FastifyRequest>,
    ) {
        const bodyString = req.rawBody?.toString();
        if (!bodyString || !signature) throw new UnauthorizedException('Missing signature or body');

        return this.githubService.handleGithubWebhook(signature, bodyString);
    }
}
