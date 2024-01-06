import { CatsRepository } from 'src/cats/cats.repository';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthValidateGuard } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly repository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: AuthValidateGuard) {
    const { sub } = payload;

    const cat = await this.repository.findCatByIdWithoutPassword(sub);
    if (!cat) throw new UnauthorizedException('권한이 없습니다.');

    return cat;
  }
}
