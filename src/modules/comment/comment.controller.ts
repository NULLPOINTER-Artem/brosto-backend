import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/getUser.decorator';
import { CreateCommentDTO } from 'src/types/DTO/create_comment.dto';
import { User } from '../auth/user.entity';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

@Controller('comment')
@UseGuards(AuthGuard())
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/getAll')
  getAllComments(): Promise<Comment[]> {
    return this.commentService.getAllComments();
  }

  @Post('/post-comment')
  postComment(
    @Body() createCommentDTO: CreateCommentDTO,
    @GetUser() user: User,
  ): Promise<void> {
    return this.commentService.postComment(createCommentDTO, user);
  }
}
