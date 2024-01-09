import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
   canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Affiche la requête pour vérifier le token JWT et d'autres informations
    console.log('JwtAuthGuard - Requête :', request);

    return super.canActivate(context) as Promise<boolean>;
  }
}
