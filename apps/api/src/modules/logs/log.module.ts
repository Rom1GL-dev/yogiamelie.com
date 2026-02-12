import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { LogRepository } from './domain/repositories/log.repository';
import { LogPrismaRepository } from './infrastructure/repositories/log.prisma.repository';
import { CreateLogService } from './usecases/create-log/create-log.service';
import { ListLogService } from './usecases/list-log/list-log.service';
import { ListLogController } from './usecases/list-log/list-log.controller';

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: LogRepository,
      useClass: LogPrismaRepository,
    },
    CreateLogService,
    ListLogService,
  ],
  controllers: [ListLogController],
  exports: [CreateLogService],
})
export class LogModule {}
