import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [SharedModule, LogsModule],
  providers: [BlogsService],
  controllers: [BlogsController],
  exports: [],
})
export class BlogsModule {}
