import { IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import { USER_ROLE } from '../../../types/enums/user-role.enum';

export class CreateUserDTO {
  @IsString()
  firstName: string;

  @IsString()
  surname: string;

  @Matches(
    /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
    { message: 'the password is too weak' },
  )
  password: string;

  @Matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, {
    message: 'the email is not correct to "/^w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/"',
  })
  email: string;

  @IsOptional()
  @IsEnum(USER_ROLE)
  role: USER_ROLE;
}
