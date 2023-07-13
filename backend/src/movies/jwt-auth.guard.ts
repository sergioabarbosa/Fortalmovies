import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Lógica de verificação de token JWT aqui:
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return false;
    }
    const [, token] = authHeader.split(' ');
    if (token !== 'meu-token-super-secreto') {
      return false;
    }
    return super.canActivate(context);
  }
}
