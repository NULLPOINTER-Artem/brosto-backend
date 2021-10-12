import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../auth/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  text: string;

  @ManyToOne(() => User, (user) => user.comments)
  @Exclude({ toPlainOnly: true })
  user: User;
}
