// backend/src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        // Tenta encontrar o usuário pelo email
        const user = await this.usersService.findByEmail(email);  // Mudança aqui para 'findByEmail'

        // Caso o usuário não seja encontrado, lança uma exceção com a mensagem personalizada
        if (!user) {
            throw new UnauthorizedException('Usuário não existe');
        }

        // Verifica se a senha fornecida corresponde à senha criptografada no banco de dados
        const isPasswordValid = await bcrypt.compare(pass, user.password);
        console.log(`Senha fornecida: ${pass}`);
        console.log(`Senha armazenada: ${user.password}`);
        console.log(`Senha válida: ${isPasswordValid}`);
        
        if (user && isPasswordValid) {
            const { password, ...result } = user.toObject();
            return result;
        }
        
        // Se a senha não for válida, lança uma exceção com a mensagem personalizada
        if (!isPasswordValid) {
            throw new UnauthorizedException('Senha ou email incorretos');
        }

        // Se tudo estiver correto, retorna o usuário sem a senha
        const { password, ...result } = user.toObject();
        return result;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user._id };
        return {
          message: 'Login efetuado',  // Mensagem de sucesso
          access_token: this.jwtService.sign(payload), // Retorno do token
        };
      }

    async register(user: any) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await this.usersService.create({ ...user, password: hashedPassword });
        return newUser;
    }
}
