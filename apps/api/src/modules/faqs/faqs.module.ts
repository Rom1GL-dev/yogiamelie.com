import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { FaqsService } from './faqs.service';
import { FaqsController } from './faqs.controller';
import { LogModule } from '../logs/log.module';

@Module({
  imports: [SharedModule, LogModule],
  providers: [FaqsService],
  controllers: [FaqsController],
  exports: [],
})
export class FaqsModule {}
