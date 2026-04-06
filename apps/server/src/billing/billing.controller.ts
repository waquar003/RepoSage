import {
    BadRequestException,
    Body,
    Controller,
    Headers,
    HttpCode,
    Post,
    Get,
    Req,
    UseGuards,
    type RawBodyRequest,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { BillingService } from './billing.service';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AuthenticatedRequest } from 'src/common/types';

@Controller('billing')
export class BillingController {
    constructor(private readonly billingService: BillingService) {}

    @Post('checkout')
    @UseGuards(AuthGuard)
    @HttpCode(200)
    @ResponseMessage('Checkout session generated')
    async createCheckout(
        @Req() request: RawBodyRequest<AuthenticatedRequest>,
        @Body('credits') credits: number,
        @Body('priceInPaisa') priceInPaisa: number,
    ) {
        return this.billingService.createCheckoutSession(request.userId, credits, priceInPaisa);
    }

    @Get('transactions')
    @UseGuards(AuthGuard)
    async getTransactions(@Req() request: RawBodyRequest<AuthenticatedRequest>) {
        return this.billingService.getTransactions(request.userId);
    }

    @Post('webhook/billing')
    @HttpCode(200)
    @ResponseMessage('Credits have been updated with user')
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
