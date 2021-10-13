import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './modules/auth/user.entity';
import { UserRepository } from './modules/auth/user.repository';
import { ITokenPayload } from './types/interfaces/token-payload.interface';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const token = req.headers.cookie?.split('=')[1];
          return token;
        },
      ]),
    });
  }

  async validate(payload: ITokenPayload): Promise<User> {
    const { email } = payload;
    const user: User = await this.userRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException({
        message:
          'You should authorize yourself or register now then authorize and continue',
      });
    }

    return user;
  }
}
