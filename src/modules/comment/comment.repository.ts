import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDTO } from 'src/types/DTO/create_comment.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { UserRepository } from '../auth/user.repository';
import { Comment } from './comment.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super();
  }

  async getAllComments(): Promise<Comment[]> {
    const comments = await this.find();

    return comments;
  }

  async postComment(
    createCommentDTO: CreateCommentDTO,
    user: User,
  ): Promise<void> {
    const { text } = createCommentDTO;
    const comment = this.create({
      text,
      user,
    });

    user.comments.push(comment);

    try {
      await this.save(comment);
      await this.userRepository.save(user);
    } catch (err) {
      console.log(err.code);
    }
  }
}
