import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { IJwtPayload } from 'src/types/interfaces/jwt-payload.interface';
import { AuthService } from './auth.service';
import { AuthorizationUserDTO } from './DTOs/authorization-user.dto';
import { CreateUserDTO } from './DTOs/create-user.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  registerUser(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.authService.registerUser(createUserDTO);
  }

  @Post('/authorization')
  authorizationUser(
    @Body() authorizationUserDTO: AuthorizationUserDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<IJwtPayload> {
    return this.authService.authorizationUser(authorizationUserDTO, response);
  }

  @Get('/logout')
  logoutUser(@Res({ passthrough: true }) response: Response): void {
    return this.authService.logoutUser(response);
  }
}
