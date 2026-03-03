import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class BillingService {
    private stripe: Stripe;

    constructor(private readonly prisma: PrismaService) {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: '2026-02-25.clover',
        });
    }

    async createCheckoutSession(userId: string, credits: number, priceInCents: number) {
        const session = await this.stripe.checkout.sessions.create({
            client_reference_id: userId,
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: `${credits} RepoSage Credits`,
                            description: 'Use credits to process more repositories and meetings',
                        },
                        unit_amount: priceInCents,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/billing?success=true`,
            cancel_url: `${process.env.FRONTEND_URL}/billing?canceled=true`,
            metadata: {
                credits: credits.toString(),
            },
        });

        return { url: session.url! };
    }

    async handleWebhook(signature: string, payload: Buffer) {
        let event: Stripe.Event;

        try {
            event = await this.stripe.webhooks.constructEventAsync(
                payload,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET!,
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
