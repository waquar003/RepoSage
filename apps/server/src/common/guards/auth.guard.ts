import { verifyToken } from '@clerk/backend';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticatedRequest } from '../types';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
        const authHeader = request.headers.authorization;
        const token = authHeader?.split(' ')[1];

        if (!token) throw new UnauthorizedException('No token provided');

        try {
            const paylaod = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY });
            request.userId = paylaod.sub;
            return true;
        } catch {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
