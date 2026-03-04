import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { APIResponse } from '@reposage/types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RESPONSE_MESSAGE } from '../decorators/response-message.decorator';
import { FastifyReply } from 'fastify';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, APIResponse<T>> {
    constructor(private reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<APIResponse<T>> {
        const response = context.switchToHttp().getResponse<FastifyReply>();

        const message =
            this.reflector.get<string>(RESPONSE_MESSAGE, context.getHandler()) ||
            'Request successful';

        return next.handle().pipe(
            map((data: T) => ({
                success: true,
                message,
                statusCode: response.statusCode,
                data,
            })),
        );
    }
}
