import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  const configService = app.get(ConfigService);

  const appUrlEnv = configService.get<string>('APP_URL');
  const dashboardUrlEnv = configService.get<string>('DASHBOARD_URL');

  if (!appUrlEnv) {
    throw new Error('APP_URL is required to allow CORS');
  }

  const allowedOrigins = [
    ...appUrlEnv.split(',').map((url) => url.trim()),
    ...(dashboardUrlEnv ? dashboardUrlEnv.split(',').map((url) => url.trim()) : []),
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
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

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );
  app.use(cookieParser());

  const port = parseInt(configService.get('PORT') ?? '3001', 10);
  await app.listen(port);
  console.log(`🚀 App running on http://localhost:${port}`);
}
void bootstrap();
