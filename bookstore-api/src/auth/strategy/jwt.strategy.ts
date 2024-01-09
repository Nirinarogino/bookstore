import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {  Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { PaylodInterface } from '../Interfaces/paylod-interface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_KEY'),
      passReqToCallback: true,
      
    });
    
  }

  async validate(payload: PaylodInterface) {
    console.log('Payload reçu :', payload);
  
    // const user = await this.userRepository.findOne({ where: { userName: payload.userName } });
  
    // if (!user) {
    //   console.log('Aucun utilisateur trouvé');
    //   throw new UnauthorizedException('Utilisateur non autorisé');
    // }
  
    // console.log('Utilisateur trouvé :', user);
    return payload;
  }
  
}
