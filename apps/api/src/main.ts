import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);

  const appUrlEnv = configService.get<string>('APP_URL');
  const uploadPath = configService.get<string>('UPLOAD_PATH') ?? '/tmp/uploads';

  if (!appUrlEnv) {
    throw new Error('APP_URL is required to allow CORS');
  }

  if (!uploadPath) {
    throw new Error('UPLOAD_PATH is not defined');
  }

  // S'assurer que le dossier d'upload existe
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const allowedOrigins = appUrlEnv.split(',').map((url) => url.trim());

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

  app.use(cookieParser());

  const port = parseInt(configService.get('PORT') ?? '3000', 10);
  await app.listen(port);
  console.log(`🚀 App running on http://localhost:${port}`);
}
void bootstrap();
