export interface APIResponse<T = any> {
    success: boolean;
    message: string;
    statusCode: number;
    data?: T;
    error?: any;
}

export interface CreateProjectDto {
    name: string;
    githubUrl: string;
    githubToken: string;
}

export type GithubSyncJob =
    | {
          type: 'INITIAL_INDEX';
          projectId: string;
          githubUrl: string;
      }
    | {
          type: 'SYNC_COMMIT';
          projectId: string;
          githubUrl: string;
          commitHashes: string[];
      };
