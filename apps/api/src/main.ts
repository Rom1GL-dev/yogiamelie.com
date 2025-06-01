import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  const configService = app.get(ConfigService);

  const appUrl = configService.get('APP_URL');

  if (!appUrl) {
    throw new Error('APP_URL is required to allow CORS');
  }

  app.enableCors({
    origin: appUrl,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.use(cookieParser());

  const port = parseInt(configService.get('PORT') ?? '3000', 10) || 3000;
  await app.listen(port);
}
void bootstrap();
