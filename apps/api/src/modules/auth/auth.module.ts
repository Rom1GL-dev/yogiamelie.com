import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { LogModule } from '../logs/log.module';
import { LoginService } from './usecases/login/login.service';
import { LoginController } from './usecases/login/login.controller';
import { LogoutService } from './usecases/logout/logout.service';
import { LogoutController } from './usecases/logout/logout.controller';
import { GetUserService } from './usecases/get-user/get-user.service';
import { GetUserController } from './usecases/get-user/get-user.controller';

@Module({
  imports: [SharedModule, LogModule],
  providers: [LoginService, LogoutService, GetUserService],
  controllers: [LoginController, LogoutController, GetUserController],
  exports: [],
})
export class AuthModule {}
