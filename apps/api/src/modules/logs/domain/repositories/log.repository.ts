import { LogEntity } from '../entities/log.entity';

export abstract class LogRepository {
  abstract create(log: {
    type: string;
    message: string;
    userId: string;
  }): Promise<LogEntity>;
  abstract findAll(): Promise<LogEntity[]>;
  abstract findByUserId(userId: string): Promise<LogEntity[]>;
}
