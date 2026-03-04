import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpExceptionBody,
    HttpStatus,
} from '@nestjs/common';
import { APIResponse } from '@reposage/types';
import { FastifyReply } from 'fastify';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        let message = 'Internal server error';
        let error = 'Error';

        if (exception instanceof HttpException) {
            const res = exception.getResponse();

            if (typeof res === 'string') {
                message = res;
            } else if (typeof res === 'object' && res !== null) {
                const body = res as HttpExceptionBody;

                if (body.message) {
                    const msg = Array.isArray(body.message) ? body.message[0] : body.message;
                    message = typeof msg === 'string' ? msg : String(msg);
                }

                if (body.error) {
                    error = body.error;
                }
            }

            error = exception.name;
        }

        const errorResponse: APIResponse = {
            success: false,
            message,
            statusCode: status,
            error,
        };

        response.status(status).send(errorResponse);
    }
}
