import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './email.dto';
import { routesV1 } from '../../config/app.routes';

@Controller(routesV1.version)
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post(routesV1.email.root)
  async sendEmail(@Body() data: CreateEmailDto) {
    const { name, email, object, message } = data;
    return this.emailService.sendEmail(name, email, object, message);
  }
}
