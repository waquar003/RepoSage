'use client';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { api } from '@/lib/axios';
import { Loader2 } from 'lucide-react';

export function SyncingOverlay({ children }: { children: React.ReactNode }) {
    const { getToken, isSignedIn } = useAuth();

    const { data: user, isLoading } = useQuery({
        queryKey: ['sync-user'],
        queryFn: async () => {
            const token = await getToken();
            const res = await api.get('/users/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        },
        enabled: !!isSignedIn,
        retry: true,
        refetchInterval: (query) => (query.state.data ? false : 1000),
    });

    if (isLoading || !user) {
        return (
            <div className="bg-background flex h-screen w-full flex-col items-center justify-center">
                <Loader2 className="text-primary h-10 w-10 animate-spin" />
                <p className="text-muted-foreground mt-4 text-sm">
                    Syncing your account with RepoSage...
                </p>
            </div>
        );
    }

    return <>{children}</>;
}
