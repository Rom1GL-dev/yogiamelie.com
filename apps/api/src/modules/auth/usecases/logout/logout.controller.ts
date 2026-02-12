import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { routesV1 } from '../../../../config/app.routes';
import { AuthenticatedRequest } from '../../../../types/auth-request';
import { LogoutService } from './logout.service';

@Controller(routesV1.version)
export class LogoutController {
  constructor(private readonly logoutService: LogoutService) {}

  @Post(routesV1.auth.logout)
  async logout(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    await this.logoutService.execute(req.session.id);

    res.clearCookie('sessionId');
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
