import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { LogsModule } from '../logs/logs.module';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [SharedModule, LogsModule, ImagesModule],
  providers: [EventsService],
  controllers: [EventsController],
  exports: [],
})
export class EventsModule {}
