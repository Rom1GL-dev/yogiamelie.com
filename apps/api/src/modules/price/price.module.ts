import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { LogModule } from '../logs/log.module';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';

@Module({
  imports: [SharedModule, LogModule],
  providers: [PriceService],
  controllers: [PriceController],
  exports: [],
})
export class PriceModule {}
