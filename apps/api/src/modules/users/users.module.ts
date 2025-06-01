import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [SharedModule, LogsModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [],
})
export class UsersModule {}
