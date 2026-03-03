import {
    BadRequestException,
    Body,
    Controller,
    Headers,
    HttpCode,
    Post,
    Req,
    type RawBodyRequest,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
    constructor(private readonly billingService: BillingService) {}

    @Post('checkout')
    async createCheckout(
        @Body('userId') userId: string,
        @Body('credits') credits: number,
        @Body('priceInCents') priceInCents: number,
    ) {
        return this.billingService.createCheckoutSession(userId, credits, priceInCents);
    }

    @Post('webhook/billing')
    @HttpCode(200)
    async handleBillingWebhook(
        @Headers('stripe-signature') signature: string,
        @Req() request: RawBodyRequest<FastifyRequest>,
    ) {
        if (!signature || !request.rawBody) {
            throw new BadRequestException('Missing Stripe signature or payload');
        }

        return this.billingService.handleWebhook(signature, request.rawBody);
    }
}
