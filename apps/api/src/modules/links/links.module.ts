import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { LogsModule } from '../logs/logs.module';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';

@Module({
  imports: [SharedModule, LogsModule],
  providers: [LinksService],
  controllers: [LinksController],
  exports: [],
})
export class LinksModule {}
