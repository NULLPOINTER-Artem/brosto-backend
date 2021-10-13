import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { CreateUserDTO } from './DTOs/create-user.dto';
import { AuthorizationUserDTO } from './DTOs/authorization-user.dto';
import { IJwtPayload } from 'src/types/interfaces/jwt-payload.interface';
import { ITokenPayload } from 'src/types/interfaces/token-payload.interface';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async registerUser(createUserDTO: CreateUserDTO): Promise<User> {
    const { password } = createUserDTO;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      ...createUserDTO,
      password: hashedPassword,
    });

    try {
      await this.save(user);

      return user;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException({ message: 'This Email is exists' });
      } else {
        throw new InternalServerErrorException({ message: 'SERVER ERROR' });
      }
    }
  }

  async authorizationUser(
    authorizationUserDTO: AuthorizationUserDTO,
    jwtService: JwtService,
    response: Response,
  ): Promise<IJwtPayload> {
    const { password, email } = authorizationUserDTO;
    const user = await this.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: ITokenPayload = { email };
      const accessToken: string = jwtService.sign(payload);

      const jwt_payload: IJwtPayload = {
        user,
      };

      response.cookie('token', accessToken, { httpOnly: true });

      return jwt_payload;
    } else {
      throw new UnauthorizedException({
        message: 'Check your email and password',
      });
    }
  }
}
