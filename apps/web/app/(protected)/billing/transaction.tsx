'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { format } from 'date-fns';
import { CreditCard, IndianRupee, User, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Transaction() {
    const { data: transactions, isLoading } = useQuery({
        queryKey: ['transactions'],
        queryFn: async () => (await api.get('/billing/transactions')).data.data,
    });

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Previous Transactions</h2>
            <div className="bg-card rounded-md border">
                <ScrollArea className="h-[300px]">
                    {isLoading ? (
                        <div className="flex items-center justify-center p-8">
                            <Loader2 className="animate-spin" />
                        </div>
                    ) : transactions?.length > 0 ? (
                        <div className="space-y-4 p-4">
                            {transactions.map((transaction: any) => (
                                <div
                                    key={transaction.id}
                                    className="flex items-center justify-between border-b py-2 last:border-0"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="rounded-full bg-blue-50 p-2">
                                            <CreditCard className="h-4 w-4 text-blue-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">
                                                {transaction.user.firstName}
                                            </p>
                                            <p className="text-muted-foreground text-xs">
                                                {format(
                                                    new Date(transaction.createdAt),
                                                    'MMM d, yyyy',
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4 text-sm font-medium">
                                        <span className="flex items-center gap-1">
                                            <User className="size-4" />+{transaction.credits}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <IndianRupee className="size-4" />
                                            {(transaction.credits * 10).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground p-4 text-center">
                            No transactions found.
                        </p>
                    )}
                </ScrollArea>
            </div>
        </div>
    );
}
