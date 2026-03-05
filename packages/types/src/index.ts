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
    githubToken?: string;
}
