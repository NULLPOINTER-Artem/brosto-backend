import { EntityRepository, Repository } from 'typeorm';
import { Wrapper } from './wrapper.entity';

@EntityRepository(Wrapper)
export class WrapperRepository extends Repository<Wrapper> {}
