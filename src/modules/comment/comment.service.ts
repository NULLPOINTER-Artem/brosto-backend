import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDTO } from 'src/types/DTO/create_comment.dto';
import { User } from '../auth/user.entity';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';

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
