import { Controller, Get, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../config/app.routes';
import { AuthGuard } from '../../../../shared/applications/guards/auth.guard';
import { ListLogService } from './list-log.service';

@Controller(routesV1.version)
@UseGuards(AuthGuard)
export class ListLogController {
  constructor(private readonly listLogService: ListLogService) {}

  @Get(routesV1.logs.root)
  async getAllLogs() {
    const logs = await this.listLogService.execute();
    return { logs };
  }
}
