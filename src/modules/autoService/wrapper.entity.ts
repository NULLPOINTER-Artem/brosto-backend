import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Service } from './service.entity';
import { TypeService } from './typeService.entity';

@Entity()
export class Wrapper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Service, (service) => service.wrapper, { eager: true })
  services: Service[];

  @OneToOne(() => TypeService, (typeService) => typeService.wrapper)
  type: TypeService;
}
