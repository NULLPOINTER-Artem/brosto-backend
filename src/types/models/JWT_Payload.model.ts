import { User } from 'src/modules/auth/user.entity';

export interface IJWT_Payload {
  user: User;
}
