import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { GithubSyncJob } from '@reposage/types';
import { GithubService } from '../../github/github.service';

@Processor('github-sync-queue')
export class GithubSyncProcessor extends WorkerHost {
    constructor(private githubService: GithubService) {
        super();
    }

    async process(job: Job<GithubSyncJob>): Promise<any> {
        const { type, projectId, githubUrl } = job.data;

        if (type === 'INITIAL_INDEX') {
            return this.handleInitialIndexing(projectId, githubUrl);
        }

        if (type === 'SYNC_COMMIT') {
            const { commitHashes } = job.data;
            return this.handleCommitSync(projectId, githubUrl, commitHashes);
        }
    }

    private async handleInitialIndexing(projectId: string, url: string) {
        const { owner, repo, branch } = await this.githubService.getTargetBranch(url);
        /// fetc h files and create embedding adn index
    }

    private async handleCommitSync(projectId: string, url: string, hashes: string[]) {
        for (const hash of hashes) {
            const diff = await this.githubService.getCommitDiff(url, hash);
            //update the commit record with the diff
            // identify changed files from diff, reprocess those files, update embeddings, etc.
        }
    }
}
