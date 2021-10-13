import { USER_ROLE } from 'src/types/enums/user-role.enum';
import { USER_STATUS } from 'src/types/enums/user-status.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from '../comment/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  surname: string;

  @Column({
    type: 'enum',
    enum: USER_ROLE,
    default: USER_ROLE.USER,
  })
  role: USER_ROLE;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: USER_STATUS,
    default: USER_STATUS.ACTIVE,
  })
  status: USER_STATUS;

  @Column({
    default: 0,
  })
  discount: number;

  @OneToMany(() => Comment, (comment) => comment.user, { eager: true })
  comments: Comment[];

  // Relations
  /*
    awards
  */
}
