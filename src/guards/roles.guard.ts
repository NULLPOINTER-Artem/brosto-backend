import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User } from 'src/modules/auth/user.entity';
import { USER_ROLE } from 'src/types/enums/user-role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    if (user.role === USER_ROLE.ADMIN) {
      return true;
    } else {
      throw new ForbiddenException({ message: 'You should be an admin!' });
    }
  }
}
