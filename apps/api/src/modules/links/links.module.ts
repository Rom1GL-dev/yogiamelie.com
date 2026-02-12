import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { LogModule } from '../logs/log.module';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';

@Module({
  imports: [SharedModule, LogModule],
  providers: [LinksService],
  controllers: [LinksController],
  exports: [],
})
export class LinksModule {}
