import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({ logger: true }),
        { rawBody: true },
    );
    
    const configService = app.get(ConfigService);
    
    app.enableCors({
        origin: configService.get('FRONTEND_URL') || 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'svix-id',
            'svix-timestamp',
            'svix-signature',
            'stripe-signature',
            'x-hub-signature-256',
        ],
    });
    const reflector = app.get(Reflector);
    app.useGlobalInterceptors(new TransformInterceptor(reflector));
    app.useGlobalFilters(new AllExceptionsFilter());

    await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
    console.log(`Server running on URL: ${await app.getUrl()}`);
}
bootstrap().catch((err) => {
    console.error('Error starting server:', err);
    process.exit(1);
});
