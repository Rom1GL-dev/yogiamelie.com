import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { SharedModule } from './shared/shared.module';
import { SessionMiddleware } from './modules/auth/middlewares/session.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { LogModule } from './modules/logs/log.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { ImagesModule } from './modules/images/images.module';
import { EventsModule } from './modules/events/events.module';
import { LinksModule } from './modules/links/links.module';
import { LocationModule } from './modules/location/location.module';
import { PriceModule } from './modules/price/price.module';
import { SiteWebModule } from './modules/site-web/site-web.module';
import { EmailModule } from './modules/email/email.module';
import { FaqsModule } from './modules/faqs/faqs.module';
import { CustomThrottlerGuard } from './shared/guards/custom-throttler.guard';
import { RolesGuard } from './shared/applications/guards/role.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        path.resolve(process.cwd(), '../../.env'),
        path.resolve(process.cwd(), '.env'),
      ],
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 20,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 100,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 300,
      },
    ]),
    SharedModule,
    LogModule,
    ImagesModule,
    AuthModule,
    UsersModule,
    BlogsModule,
    EventsModule,
    LinksModule,
    LocationModule,
    PriceModule,
    SiteWebModule,
    EmailModule,
    FaqsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('*');
  }
}
