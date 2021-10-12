import { CreateUserDTO } from 'src/types/DTO/create_user-auth.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { AuthorizationUserDTO } from 'src/types/DTO/authorization_user.dto';
import { IJWT_Payload } from 'src/types/models/JWT_Payload.model';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenPayload } from 'src/types/models/Token_Payload.model';
import { Response } from 'express';

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
  ): Promise<IJWT_Payload> {
    const { password, email } = authorizationUserDTO;
    const user = await this.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: ITokenPayload = { email };
      const accessToken: string = jwtService.sign(payload);

      const jwt_payload: IJWT_Payload = {
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
