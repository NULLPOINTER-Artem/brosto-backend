import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceRepository } from './service.repository';
import { TypeServiceRepository } from './typeService.repository';
import { WrapperRepository } from './wrapper.repository';

@Injectable()
export class Auto_ServiceService {
  constructor(
    @InjectRepository(WrapperRepository)
    private readonly wrapperRepository: WrapperRepository,
    @InjectRepository(ServiceRepository)
    private readonly serviceRepository: ServiceRepository,
    @InjectRepository(TypeServiceRepository)
    private readonly typeServiceRepository: TypeServiceRepository,
  ) {}
}
