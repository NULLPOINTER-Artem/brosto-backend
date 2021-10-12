import { EntityRepository, Repository } from 'typeorm';
import { TypeService } from './typeService.entity';

@EntityRepository(TypeService)
export class TypeServiceRepository extends Repository<TypeService> {}
