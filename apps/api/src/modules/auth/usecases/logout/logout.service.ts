import { Injectable } from '@nestjs/common';
import { CacheStorage } from '../../../../shared/ports/cache-storage';
import { CreateLogService } from '../../../logs/usecases/create-log/create-log.service';
import { getSessionStorageKey } from '../../config/storage';
import { Session } from '../../../../types/session';

@Injectable()
export class LogoutService {
  constructor(
    private readonly cache: CacheStorage,
    private readonly createLogService: CreateLogService,
  ) {}

  async execute(sessionId: string) {
    const user = await this.cache.get<Session['user']>(
      getSessionStorageKey(sessionId),
    );

    await this.cache.del(getSessionStorageKey(sessionId));

    await this.createLogService.execute({
      type: 'DÉCONNEXION',
      message: `${user?.name} s'est déconnecté`,
      userId: user?.id ?? '',
    });
  }
}
