import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { USER_ROLE } from 'src/types/enums/user-role.enum';
import { User } from '../auth/user.entity';
import { UserRepository } from '../auth/user.repository';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find({ role: USER_ROLE.USER });

    return users;
  }
}
