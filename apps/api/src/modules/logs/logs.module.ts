import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';

@Module({
  imports: [SharedModule],
  providers: [LogsService],
  controllers: [LogsController],
  exports: [LogsService],
})
export class LogsModule {}
