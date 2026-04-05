'use client';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useProject } from '@/hooks/use-project';

export function AppSidebar() {
    const { projects, projectId, setProjectId } = useProject();

    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>{/* Logo logic */}</SidebarHeader>
            <SidebarContent>
                {/* Application Menu Items */}
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
