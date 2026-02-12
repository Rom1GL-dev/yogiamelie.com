import { Injectable } from '@nestjs/common';
import { LogRepository } from '../../domain/repositories/log.repository';
import { CreateLogDto } from './create-log.dto';

@Injectable()
export class CreateLogService {
  constructor(private readonly logRepository: LogRepository) {}

  async execute(dto: CreateLogDto) {
    await this.logRepository.create({
      type: dto.type,
      message: dto.message,
      userId: dto.userId,
    });

    return { message: 'Le log a été ajouté.' };
  }
}
