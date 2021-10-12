import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserRepository } from '../auth/user.repository';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), AuthModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
