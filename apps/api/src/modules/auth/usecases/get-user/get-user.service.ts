import { Injectable } from '@nestjs/common';
import { CacheStorage } from '../../../../shared/ports/cache-storage';
import { getSessionStorageKey } from '../../config/storage';
import { Session } from '../../../../types/session';

@Injectable()
export class GetUserService {
  constructor(private readonly cache: CacheStorage) {}

  async execute(sessionId: string): Promise<Session['user'] | null> {
    const user = await this.cache.get<Session['user']>(
      getSessionStorageKey(sessionId),
    );

    if (!user) {
      return null;
    }

    return user;
  }
}
