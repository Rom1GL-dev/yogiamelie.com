import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { CacheStorage } from '../../../../shared/ports/cache-storage';
import { CreateLogService } from '../../../logs/usecases/create-log/create-log.service';
import { LoginDto } from './login.dto';
import {
  createSession,
  generateSessionId,
  comparePasswords,
} from '../../config/sessions';

@Injectable()
export class LoginService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheStorage,
    private readonly createLogService: CreateLogService,
  ) {}

  async execute(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await comparePasswords(
      loginDto.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new BadGatewayException('Invalid password');
    }

    const sessionId = generateSessionId();

    const session = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name || '',
    };

    await createSession(this.cache, sessionId, session);

    await this.createLogService.execute({
      type: 'CONNEXION',
      message: `${user.name} s'est connecté`,
      userId: user.id,
    });

    return { sessionId, user: session };
  }
}
