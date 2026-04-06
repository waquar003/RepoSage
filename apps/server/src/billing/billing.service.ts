import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BillingService {
    private stripe: Stripe;

    constructor(
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService,
    ) {
        this.stripe = new Stripe(this.configService.getOrThrow<string>('STRIPE_SECRET_KEY'), {
            apiVersion: '2026-02-25.clover',
        });
    }

    async createCheckoutSession(userId: string, credits: number, priceInPaisa: number) {
        try {
            const session = await this.stripe.checkout.sessions.create({
                client_reference_id: userId,
                line_items: [
                    {
                        price_data: {
                            currency: 'inr',
                            product_data: {
                                name: `${credits} RepoSage Credits`,
                                description:
                                    'Use credits to process more repositories and meetings',
                            },
                            unit_amount: priceInPaisa,
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${this.configService.get('FRONTEND_URL')}/billing?success=true`,
                cancel_url: `${this.configService.get('FRONTEND_URL')}/billing?canceled=true`,
                metadata: {
                    credits: credits.toString(),
                },
            });

            return { url: session.url! };
        } catch (error: any) {
            console.error('Stripe Checkout Error:', error.message);
            throw new BadRequestException(error.message);
        }
    }

    async getTransactions(userId: string) {
        return this.prisma.transaction.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: { user: true },
        });
    }

    async handleWebhook(signature: string, payload: Buffer) {
        let event: Stripe.Event;

        try {
            event = await this.stripe.webhooks.constructEventAsync(
                payload,
                signature,
                this.configService.getOrThrow<string>('STRIPE_WEBHOOK_SECRET'),
                600, //tolerance of 10 minutes
            );
        } catch (err) {
            console.error('Error verifying Stripe webhook signature:', err);
            throw new BadRequestException('Invalid Stripe webhook signature');
        }

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const userId = session.client_reference_id;
            const credits = parseInt(session.metadata?.credits || '0', 10);

            if (!userId || !credits) {
                console.error('Missing userId or credits in Stripe session metadata');
                return {
                    success: false,
                    message: 'Missing userId or credits in sessioin metadata',
                };
            }

            await this.prisma.$transaction(async (tx) => {
                await tx.transaction.create({
                    data: {
                        userId,
                        credits,
                    },
                });

                await tx.user.update({
                    where: { id: userId },
                    data: { credits: { increment: credits } },
                });
            });

            return { success: true, message: 'Credits added successfully' };
        }

        return { success: true, message: 'Event received' };
    }
}
