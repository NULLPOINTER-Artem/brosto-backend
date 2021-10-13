import { User } from 'src/modules/auth/user.entity';

export interface IJwtPayload {
  user: User;
}
