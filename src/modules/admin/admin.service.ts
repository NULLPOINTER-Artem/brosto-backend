import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ROLES_USERS } from 'src/types/enums/roles-users.enum';
import { User } from '../auth/user.entity';
import { UserRepository } from '../auth/user.repository';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async getAllUsers(user: User): Promise<User[]> {
    const { role } = user;

    if (role === ROLES_USERS.ADMIN) {
      const users = await this.userRepository.find({ role: ROLES_USERS.USER });

      return users;
    } else {
      throw new UnauthorizedException('You should be ADMIN!');
    }
  }
}
