import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { LogModule } from '../logs/log.module';

@Module({
  imports: [SharedModule, LogModule],
  providers: [BlogsService],
  controllers: [BlogsController],
  exports: [],
})
export class BlogsModule {}
