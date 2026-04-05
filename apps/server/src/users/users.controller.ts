import {
    Controller,
    Headers,
    type RawBodyRequest,
    Req,
    Post,
    HttpCode,
    BadRequestException,
    Get,
    UseGuards,
    NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { FastifyRequest } from 'fastify';
import { Webhook } from 'svix';
import type { WebhookEvent } from '@clerk/backend';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AuthenticatedRequest } from 'src/common/types';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,
    ) {}

    @Post('webhook/user')
    @HttpCode(200)
    @ResponseMessage('User identity synchronized successfully')
    async handleUserWebhook(
        @Headers('svix-id') svixId: string,
        @Headers('svix-timestamp') svixTimestamp: string,
        @Headers('svix-signature') svixSignature: string,
        @Req() request: RawBodyRequest<FastifyRequest>,
    ) {
        if (!svixId || !svixTimestamp || !svixSignature || !request.rawBody) {
            console.error('Missing svix headers or payload');
            throw new BadRequestException('Missing svix headers or payload');
        }

        const secret = this.configService.getOrThrow<string>('CLERK_WEBHOOK_SECRET');
        const webhook = new Webhook(secret);
        let event: WebhookEvent;

        try {
            event = webhook.verify(request.rawBody.toString('utf-8'), {
                'svix-id': svixId,
                'svix-timestamp': svixTimestamp,
                'svix-signature': svixSignature,
            }) as WebhookEvent;
        } catch (err) {
            console.error('Error verifying webhook:', err);
            throw new BadRequestException('Invalid webhook signature');
        }

        if (event.type === 'user.created' || event.type === 'user.updated') {
            return await this.usersService.syncUser(event.data);
        } else if (event.type === 'user.deleted') {
            if (event.data.id) {
                return await this.usersService.deleteUser(event.data.id);
            }
        }
    }

    @Get('me')
    @UseGuards(AuthGuard)
    async getMe(@Req() request: RawBodyRequest<AuthenticatedRequest>) {
        const user = await this.usersService.getUser(request.userId);

        if (!user) {
            throw new NotFoundException('User not yet synchronized');
        }

        return user;
    }
}
