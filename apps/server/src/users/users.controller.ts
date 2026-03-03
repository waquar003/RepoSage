import {
    Controller,
    Headers,
    type RawBodyRequest,
    Req,
    Post,
    HttpCode,
    BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { FastifyRequest } from 'fastify';
import { Webhook } from 'svix';
import type { WebhookEvent } from '@clerk/backend';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('webhook/user')
    @HttpCode(200)
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

        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

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
            await this.usersService.syncUser(event.data);
        } else if (event.type === 'user.deleted') {
            if (event.data.id) {
                await this.usersService.deleteUser(event.data.id);
            }
        }

        return { success: true };
    }
}
