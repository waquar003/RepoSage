import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class GithubGateway {
    @WebSocketServer()
    server!: Server;

    notifyNewCommits(projectId: string, commitHashes: string[]) {
        this.server.emit(`project:${projectId}:new_commits`, {
            commitHashes,
        });
    }
}
