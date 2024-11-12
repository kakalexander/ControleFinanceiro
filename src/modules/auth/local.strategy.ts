// local.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });  // A chave 'email' será usada para autenticação
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);

    // Se o usuário não for encontrado ou a senha estiver incorreta, ele já será tratado
    if (!user) {
      throw new UnauthorizedException('Usuário não existe');
    }

    // Retorna o usuário válido
    return user;
  }
}
