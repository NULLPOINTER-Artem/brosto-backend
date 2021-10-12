import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository]), AuthModule],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
