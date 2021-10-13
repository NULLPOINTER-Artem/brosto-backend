import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { CreateUserDTO } from './DTOs/create-user.dto';
import { AuthorizationUserDTO } from './DTOs/authorization-user.dto';
import { IJwtPayload } from 'src/types/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  registerUser(createUserDTO: CreateUserDTO): Promise<User> {
    return this.userRepository.registerUser(createUserDTO);
  }

  authorizationUser(
    authorizationUserDTO: AuthorizationUserDTO,
    response: Response,
  ): Promise<IJwtPayload> {
    const jwtService = this.jwtService;
    return this.userRepository.authorizationUser(
      authorizationUserDTO,
      jwtService,
      response,
    );
  }

  logoutUser(response: Response): void {
    response.clearCookie('token');
  }
}
