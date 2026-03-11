import { Module } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { GithubGateway } from './github.gateway';
import { GithubSyncProcessor } from '../queue/worker/github-sync.processor';

@Module({
    controllers: [GithubController],
    providers: [GithubService, GithubGateway, GithubSyncProcessor],
    exports: [GithubService],
})
export class GithubModule {}
