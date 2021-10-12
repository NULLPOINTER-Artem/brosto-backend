import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Service } from './service.entity';
import { Wrapper } from './wrapper.entity';

@Entity()
export class TypeService {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Wrapper, (wrapper) => wrapper.type)
  @JoinColumn()
  wrapper: Wrapper;

  @OneToOne(() => Service, (service) => service.type)
  @JoinColumn()
  service: Service;

  @Column({ unique: true })
  name: string;
}
