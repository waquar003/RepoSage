import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  console.log(`Server running on URL: ${await app.getUrl()}`);
}
bootstrap().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
