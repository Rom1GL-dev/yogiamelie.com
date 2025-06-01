import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SharedModule } from '../../shared/shared.module';
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [SharedModule, LogsModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
