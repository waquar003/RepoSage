import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from '@reposage/types';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class ProjectsService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllUserProjects(userId: string) {
        return this.prisma.project.findMany({
            where: {
                userToProjects: {
                    some: { userId },
                },
                deletedAt: null,
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async getProjectById(projectId: string, userId: string) {
        const project = await this.prisma.project.findFirst({
            where: { id: projectId, userToProjects: { some: { userId } } },
        });

        if (!project) throw new BadRequestException('Project not found or access denied');
        return project;
    }

    async createProject(userId: string, dto: CreateProjectDto) {
        // Github loading and indxign is remaining
        // TODO: integrate the github and ai module
        const project = await this.prisma.project.create({
            data: {
                name: dto.name,
                githubUrl: dto.githubUrl,
                userToProjects: {
                    create: {
                        userId,
                    },
                },
            },
        });

        return project;
    }

    async archiveProject(userId: string, projectId: string) {
        return this.prisma.project.update({
            where: {
                id: projectId,
                userToProjects: {
                    some: { userId },
                },
            },
            data: { deletedAt: new Date() },
        });
    }

    async deleteProject(userId: string, projectId: string) {
        // TODO: we have to delete the embeddign also handle at the last after migration
        return this.prisma.project.delete({
            where: {
                id: projectId,
                userToProjects: { some: { userId } },
            },
        });
    }
}
