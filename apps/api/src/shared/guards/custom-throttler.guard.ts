import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  private readonly exemptedPaths = ['/v1/auth/login', '/v1/auth/me'];

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const path = request.url;

    if (this.exemptedPaths.includes(path)) {
      return true;
    }

    return super.canActivate(context);
  }
}
