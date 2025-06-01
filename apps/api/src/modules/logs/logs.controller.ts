import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../config/app.routes';
import { AuthGuard } from '../auth/auth.guard';
import { LogsService } from './logs.service';
import { AddLogDto } from './dto/add-log.dto';

@Controller(routesV1.version)
@UseGuards(AuthGuard)
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get(routesV1.logs.root)
  async getAllEvents() {
    const logs = await this.logsService.getAllLogs();
    return { logs: logs };
  }

  @Post(routesV1.logs.root)
  async add(@Body() addEventDto: AddLogDto) {
    const logs = await this.logsService.add(addEventDto);

    return { logs: logs };
  }
}
