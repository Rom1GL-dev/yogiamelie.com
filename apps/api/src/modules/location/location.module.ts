import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { LogsModule } from '../logs/logs.module';
import { ImagesModule } from '../images/images.module';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';

@Module({
  imports: [SharedModule, LogsModule, ImagesModule],
  providers: [LocationService],
  controllers: [LocationController],
  exports: [],
})
export class LocationModule {}
