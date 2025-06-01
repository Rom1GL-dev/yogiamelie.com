import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { LogsModule } from '../logs/logs.module';
import { SiteWebService } from './site-web.service';
import { SiteWebController } from './site-web.controller';

@Module({
  imports: [SharedModule, LogsModule],
  providers: [SiteWebService],
  controllers: [SiteWebController],
  exports: [],
})
export class SiteWebModule {}
