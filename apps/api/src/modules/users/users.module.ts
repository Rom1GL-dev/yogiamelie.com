import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LogModule } from '../logs/log.module';

@Module({
  imports: [SharedModule, LogModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [],
})
export class UsersModule {}
