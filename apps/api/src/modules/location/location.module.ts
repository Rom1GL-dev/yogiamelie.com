import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { LogModule } from '../logs/log.module';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';

@Module({
  imports: [SharedModule, LogModule],
  providers: [LocationService],
  controllers: [LocationController],
  exports: [],
})
export class LocationModule {}
