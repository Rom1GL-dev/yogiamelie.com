import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { LogsModule } from '../logs/logs.module';
import { ImagesModule } from '../images/images.module';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';

@Module({
  imports: [SharedModule, LogsModule, ImagesModule],
  providers: [PriceService],
  controllers: [PriceController],
  exports: [],
})
export class PriceModule {}
