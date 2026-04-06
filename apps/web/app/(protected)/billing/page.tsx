'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Info, Loader2, IndianRupee } from 'lucide-react';
import Transaction from './transaction';

export default function BillingPage() {
    const [creditsToBuy, setCreditsToBuy] = useState<number[]>([20]);
    const creditsToBuyAmount = creditsToBuy[0]!;
    const price = (creditsToBuyAmount * 10).toFixed(2);

    const { data: user, isLoading } = useQuery({
        queryKey: ['sync-user'],
        queryFn: async () => (await api.get('/users/me')).data.data,
    });

    const checkoutMutation = useMutation({
        mutationFn: async () => {
            const res = await api.post('/billing/checkout', {
                credits: creditsToBuyAmount,
                priceInPaisa: Math.round(creditsToBuyAmount * 10 * 100),
            });
            return res.data.data;
        },
        onSuccess: (data) => {
            if (data.url) window.location.href = data.url;
        },
    });

    return (
        <div className="space-y-8 p-4">
            <div>
                <h1 className="text-2xl font-semibold">Billing</h1>
                <p className="text-muted-foreground text-sm">
                    Manage your credits and view history
                </p>
            </div>

            <div className="bg-card space-y-6 rounded-md border p-6 shadow-sm">
                <div>
                    <h2 className="text-lg font-semibold">Current Credits</h2>
                    {isLoading ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        <p className="text-muted-foreground text-sm">
                            You have{' '}
                            <span className="text-foreground font-bold">{user?.credits || 0}</span>{' '}
                            credits.
                        </p>
                    )}
                </div>

                <div className="flex gap-2 rounded-md border border-blue-200 bg-blue-50/50 p-4 text-sm text-blue-800">
                    <Info className="size-4 shrink-0" />
                    <p>Each credit allows indexing 1 file. 10 files = 10 credits.</p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Purchase Credits</h2>
                    <Slider
                        min={10}
                        max={100}
                        step={5}
                        value={creditsToBuy}
                        onValueChange={setCreditsToBuy}
                    />
                    <Button
                        className="w-full sm:w-auto"
                        onClick={() => checkoutMutation.mutate()}
                        disabled={checkoutMutation.isPending}
                    >
                        {checkoutMutation.isPending ? (
                            'Connecting...'
                        ) : (
                            <span className="flex items-center gap-1">
                                Buy {creditsToBuyAmount} credits for{' '}
                                <IndianRupee className="size-4" />
                                {price}
                            </span>
                        )}
                    </Button>
                </div>
            </div>

            <Transaction />
        </div>
    );
}
