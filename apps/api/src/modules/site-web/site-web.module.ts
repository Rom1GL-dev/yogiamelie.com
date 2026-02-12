import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { LogModule } from '../logs/log.module';
import { SiteWebService } from './site-web.service';
import { SiteWebController } from './site-web.controller';

@Module({
  imports: [SharedModule, LogModule],
  providers: [SiteWebService],
  controllers: [SiteWebController],
  exports: [],
})
export class SiteWebModule {}
