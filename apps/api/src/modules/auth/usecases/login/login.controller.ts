import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { routesV1 } from '../../../../config/app.routes';
import { getCookiesOptions } from '../../../../shared/utils/cookies';
import { LoginService } from './login.service';
import { LoginDto } from './login.dto';

@Controller(routesV1.version)
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly configService: ConfigService,
  ) {}

  @Post(routesV1.auth.login)
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const result = await this.loginService.execute(loginDto);

    res.cookie('sessionId', result.sessionId, getCookiesOptions(this.configService));
    res.status(HttpStatus.OK).json({
      account: result.user,
    });
  }
}
