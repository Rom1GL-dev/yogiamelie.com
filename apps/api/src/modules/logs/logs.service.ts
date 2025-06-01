import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/infrastructure/prisma.service';
import { AddLogDto } from './dto/add-log.dto';

@Injectable()
export class LogsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllLogs() {
    return this.prisma.log.findMany();
  }

  async add(data: AddLogDto) {
    await this.prisma.log.create({
      data: data,
    });

    return { message: 'Le log a été ajouté.' };
  }
}
