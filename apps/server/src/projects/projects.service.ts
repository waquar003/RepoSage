import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from '@reposage/types';
import { EncryptionService } from 'src/common/services/encryption.service';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { GithubService } from 'src/github/github.service';
import { QueueService } from 'src/queue/queue.service';

@Injectable()
export class ProjectsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly encryptionService: EncryptionService,
        private readonly githubService: GithubService,
        private readonly queueService: QueueService,
    ) {}

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
        const { encryptedData, iv } = this.encryptionService.encrypt(dto.githubToken);
        await this.prisma.user.update({
            where: { id: userId },
            data: { githubToken: encryptedData, githubTokenIv: iv },
        });

        const octokit = await this.githubService.getInstanceForUser(userId);
        const { owner, repo } = await this.githubService.getTargetBranch(octokit, dto.githubUrl);

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

        await this.githubService.createAutomatedWebhook(octokit, owner, repo);

        await this.queueService.addGithubSyncJob({
            type: 'INITIAL_INDEX',
            projectId: project.id,
            githubUrl: dto.githubUrl,
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
