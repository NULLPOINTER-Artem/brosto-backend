import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CreateCommentDTO } from './DTOs/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private readonly commentRepository: CommentRepository,
  ) {}

  postComment(createCommentDTO: CreateCommentDTO, user: User): Promise<void> {
    return this.commentRepository.postComment(createCommentDTO, user);
  }

  getAllComments(): Promise<Comment[]> {
    return this.commentRepository.getAllComments();
  }
}
