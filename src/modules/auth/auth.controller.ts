import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthorizationUserDTO } from 'src/types/DTO/authorization_user.dto';
import { CreateUserDTO } from 'src/types/DTO/create_user-auth.dto';
import { IJWT_Payload } from 'src/types/models/JWT_Payload.model';
import { AuthService } from './auth.service';
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
  ): Promise<IJWT_Payload> {
    return this.authService.authorizationUser(authorizationUserDTO, response);
  }

  @Get('/logout')
  logoutUser(@Res({ passthrough: true }) response: Response): void {
    return this.authService.logoutUser(response);
  }
}
