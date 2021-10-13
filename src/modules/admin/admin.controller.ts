import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { User } from '../auth/user.entity';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(AuthGuard, new RolesGuard())
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/getAllUsers')
  getAllUsers(): Promise<User[]> {
    return this.adminService.getAllUsers();
  }
}
