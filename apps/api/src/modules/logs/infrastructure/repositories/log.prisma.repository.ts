import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { LogRepository } from '../../domain/repositories/log.repository';
import { LogEntity } from '../../domain/entities/log.entity';

@Injectable()
export class LogPrismaRepository implements LogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(log: {
    type: string;
    message: string;
    userId: string;
  }): Promise<LogEntity> {
    return this.prisma.log.create({
      data: {
        type: log.type,
        message: log.message,
        userId: log.userId,
      },
    });
  }

  async findAll(): Promise<LogEntity[]> {
    return this.prisma.log.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByUserId(userId: string): Promise<LogEntity[]> {
    return this.prisma.log.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
