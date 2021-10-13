import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/decorators/getUser.decorator';
import { Public } from 'src/decorators/public.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from '../auth/user.entity';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CreateCommentDTO } from './DTOs/create-comment.dto';

@Controller('comment')
@UseGuards(AuthGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/getAll')
  @Public()
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
