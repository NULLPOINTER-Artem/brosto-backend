import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeService } from './typeService.entity';
import { Wrapper } from './wrapper.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Wrapper, (wrapper) => wrapper.services)
  wrapper: Wrapper;

  @OneToOne(() => TypeService, (typeService) => typeService.service)
  type: TypeService;

  @Column({ unique: true })
  name: string;

  @Column()
  price: number;

  @Column({
    type: 'varchar',
    length: 200,
  })
  text: string;
}
