'use client';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useProject } from '@/hooks/use-project';
import { cn } from '@/lib/utils';
import { Key } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
    {
        title: 'Credential',
        url: '/credential',
        icon: Key,
    },
];

export function AppSidebar() {
    const { projects, projectId, setProjectId } = useProject();
    const pathname = usePathname();

    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>{/* Logo logic */}</SidebarHeader>
            <SidebarContent>
                {/* Application Menu Items */}
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={item.url}
                                            className={cn({
                                                'bg-primary! text-white!': pathname === item.url,
                                            })}
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarMenu>
                    {projects?.map((project) => (
                        <SidebarMenuItem key={project.id}>
                            <SidebarMenuButton
                                onClick={() => setProjectId(project.id)}
                                isActive={project.id === projectId}
                            >
                                <div className="bg-primary flex size-6 items-center justify-center rounded text-white">
                                    {project.name[0]}
                                </div>
                                <span>{project.name}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}
