'use client';

import { ApiKeyForm } from '@/components/api-key-form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { api } from '@/lib/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Key, Loader2, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CredentialPage() {
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();

    const { data: keys, isLoading } = useQuery({
        queryKey: ['api-keys'],
        queryFn: async () => {
            const res = await api.get('/api-keys');
            return res.data.data;
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (keyId: string) => {
            return await api.delete(`/api-keys/${keyId}`);
        },
        onSuccess: () => {
            toast.success('API Key deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['api-keys'] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Failed to delete API key');
        },
    });

    return (
        <div className="flex flex-col gap-4 p-2">
            <div className="flex items-center justify-between px-2">
                <div className="text-muted-foreground flex items-center gap-2 text-sm font-semibold">
                    <Key className="size-4" />
                    <span>Secrets</span>
                </div>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                            <Plus className="size-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add API Key</DialogTitle>
                        </DialogHeader>
                        <ApiKeyForm onSuccess={() => setIsOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex flex-col gap-1">
                {isLoading ? (
                    <div className="flex items-center justify-center p-4">
                        <Loader2 className="text-muted-foreground size-4 animate-spin" />
                    </div>
                ) : keys?.length === 0 ? (
                    <p className="text-muted-foreground px-2 text-xs italic">No keys added yet.</p>
                ) : (
                    keys?.map((key: any) => (
                        <div
                            key={key.id}
                            className="hover:bg-sidebar-accent group flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors"
                        >
                            <div className="flex items-center gap-2 overflow-hidden">
                                <span className="max-w-[100px] truncate font-medium">
                                    {key.name}
                                </span>
                                <Badge
                                    variant="outline"
                                    className="scale-90 px-1 py-0 text-[10px] font-normal"
                                >
                                    {key.provider}
                                </Badge>
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-destructive size-7 opacity-0 transition-opacity group-hover:opacity-100"
                                onClick={() => {
                                    if (confirm('Are you sure you want to delete this key?')) {
                                        deleteMutation.mutate(key.id);
                                    }
                                }}
                                disabled={deleteMutation.isPending}
                            >
                                {deleteMutation.isPending ? (
                                    <Loader2 className="size-3 animate-spin" />
                                ) : (
                                    <Trash2 className="size-3" />
                                )}
                            </Button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
