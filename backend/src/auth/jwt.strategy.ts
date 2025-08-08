import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service'; // <<-- Importe o serviço de usuário

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) { // <<-- Injete o serviço aqui
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'senha123',
    });
  }

  async validate(payload: any) {
    console.log('Payload recebido na JwtStrategy:', payload);
    
    // <<-- Adicione esta parte para buscar e validar o usuário no banco
    const user = await this.usersService.findOneByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    // <<-- Retorne o objeto de entidade do usuário completo
    return user; 
  }
}