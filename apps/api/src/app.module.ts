import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { SessionMiddleware } from './modules/auth/session.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { EventsModule } from './modules/events/events.module';
import { LogsModule } from './modules/logs/logs.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { ImagesModule } from './modules/images/images.module';
import { LinksModule } from './modules/links/links.module';
import { SiteWebModule } from './modules/site-web/site-web.module';
import { LocationModule } from './modules/location/location.module';
import { PriceModule } from './modules/price/price.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SharedModule,
    LogsModule,
    ImagesModule,
    AuthModule,
    UsersModule,
    EventsModule,
    BlogsModule,
    LinksModule,
    SiteWebModule,
    LocationModule,
    PriceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('*');
  }
}
