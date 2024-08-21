import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '12345',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findById(payload.userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { userId: user.id, email: user.email };
  }
}
