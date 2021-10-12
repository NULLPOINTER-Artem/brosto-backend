import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorizationUserDTO } from 'src/types/DTO/authorization_user.dto';
import { CreateUserDTO } from 'src/types/DTO/create_user-auth.dto';
import { IJWT_Payload } from 'src/types/models/JWT_Payload.model';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

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
  ): Promise<IJWT_Payload> {
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
