import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/getUser.decorator';
import { User } from '../auth/user.entity';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(AuthGuard())
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/getAllUsers')
  getAllUsers(@GetUser() user: User): Promise<User[]> {
    return this.adminService.getAllUsers(user);
  }
}
