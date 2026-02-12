import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { LogModule } from '../logs/log.module';

@Module({
  imports: [SharedModule, LogModule],
  providers: [EventsService],
  controllers: [EventsController],
  exports: [],
})
export class EventsModule {}
