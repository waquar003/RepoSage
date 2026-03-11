import {
    BadRequestException,
    Injectable,
    NotFoundException,
    OnModuleInit,
    UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import type { Octokit } from 'octokit' with { 'resolution-mode': 'import' };
import { PrismaService } from 'src/database/prisma/prisma.service';
import { QueueService } from 'src/queue/queue.service';
import { GithubGateway } from './github.gateway';
import { Webhooks } from '@octokit/webhooks';

@Injectable()
export class GithubService implements OnModuleInit {
    constructor(
        private readonly queueService: QueueService,
        private readonly prisma: PrismaService,
        private readonly githubGateway: GithubGateway,
    ) {}

    private webhooks = new Webhooks({
        secret: process.env.GITHUB_WEBHOOK_SECRET!,
    });

    private octokit!: Octokit;
    async onModuleInit() {
        const { Octokit: OctokitClass } = await import('octokit');
        this.octokit = new OctokitClass({ auth: process.env.GITHUB_TOKEN });
    }

    async getTargetBranch(githubUrl: string) {
        if (!this.octokit) await this.onModuleInit();

        const parts = githubUrl.replace(/\/$/, '').split('/');
        const owner = parts[3];
        const repo = parts[4];

        if (!owner || !repo) {
            throw new BadRequestException('Invalid GitHub URL');
        }

        if (parts[5] === 'tree' && parts[6]) {
            return { owner, repo, branch: parts[6] };
        }

        const response = await this.octokit.rest.repos.get({ owner, repo });
        return { owner, repo, branch: response.data.default_branch };
    }

    async getFileCount(owner: string, repo: string, branch: string): Promise<number> {
        const { data } = await this.octokit.rest.git.getTree({
            owner,
            repo,
            tree_sha: branch,
            recursive: 'true',
        });
        return data.tree.filter((item) => item.type === 'blob').length;
    }

    async getCommitDiff(githubUrl: string, commitHash: string) {
        const { data } = await axios.get<string>(`${githubUrl}/commit/${commitHash}.diff`, {
            headers: { Accept: 'application/vnd.github.v3.diff' },
        });
        return data;
    }

    async syncGithubData(projectId: string, userId: string, hashes: string[]) {
        const project = await this.prisma.project.findFirst({
            where: {
                id: projectId,
                userToProjects: { some: { userId } },
            },
        });

        if (!project) throw new NotFoundException('Project not found');

        // TODO: Calculate cost
        const cost = parseInt(process.env.COST_PER_COMMIT!); // temoparry

        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');

        if (cost > user.credits) throw new BadRequestException('Insufficient credits');

        await this.prisma.user.update({
            where: { id: userId },
            data: { credits: { decrement: cost } },
        });

        await this.queueService.addGithubSyncJob({
            type: 'SYNC_COMMIT',
            projectId,
            githubUrl: project.githubUrl,
            commitHashes: hashes,
        });

        return { status: 'queued', count: hashes.length, cost };
    }

    async handleGithubWebhook(signature: string, body: string) {
        const isValid = await this.webhooks.verify(body, signature);
        if (!isValid) throw new UnauthorizedException('Invalid signature');

        const payload = JSON.parse(body);
        const githubUrl = payload.repository?.html_url;
        const newCommits = payload.commits || [];

        if (newCommits.length === 0) return { message: 'No new commits' };

        const project = await this.prisma.project.findFirst({
            where: { githubUrl, deletedAt: null },
        });

        if (!project) return { message: 'Project not found' };

        const hashes = newCommits.map((c) => c.id);
        this.githubGateway.notifyNewCommits(project.id, hashes);

        return { message: 'Notification sent to user' };
    }
}
