import { MaxLength, MinLength } from 'class-validator';

export class CreateCommentDTO {
  @MinLength(1)
  @MaxLength(200)
  text: string;
}
