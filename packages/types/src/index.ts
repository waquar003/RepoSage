export interface APIResponse<T = any> {
    success: boolean;
    message: string;
    statusCode: number;
    data?: T;
    error?: any;
}
