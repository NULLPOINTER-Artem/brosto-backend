import { ROLES_USERS } from 'src/types/enums/roles-users.enum';
import { STATUS_USERS } from 'src/types/enums/status-users.enum';
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
    enum: ROLES_USERS,
    default: ROLES_USERS.USER,
  })
  role: ROLES_USERS;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: STATUS_USERS,
    default: STATUS_USERS.ACTIVE,
  })
  status: STATUS_USERS;

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
