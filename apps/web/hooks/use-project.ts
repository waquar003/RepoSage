import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { useLocalStorage } from 'usehooks-ts';
import { api } from '@/lib/axios';

export const useProject = () => {
    const { getToken } = useAuth();
    const [projectId, setProjectId] = useLocalStorage('reposage-projectId', '');

    const { data: projects, refetch } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const token = await getToken();
            const res = await api.get('/projects', {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        },
    });

    const project = projects?.find((p: any) => p.id === projectId);

    return { projects, project, projectId, setProjectId, refetch };
};
