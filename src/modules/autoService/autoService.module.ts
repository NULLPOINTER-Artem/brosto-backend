import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutoServiceController } from './autoService.controller';
import { Auto_ServiceService } from './autoService.service';
import { ServiceRepository } from './service.repository';
import { TypeServiceRepository } from './typeService.repository';
import { WrapperRepository } from './wrapper.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WrapperRepository,
      ServiceRepository,
      TypeServiceRepository,
    ]),
  ],
  providers: [Auto_ServiceService],
  controllers: [AutoServiceController],
})
export class AutoServiceModule {}
