import { Controller } from '@nestjs/common';
import { Auto_ServiceService } from './autoService.service';

@Controller('autoService')
export class AutoServiceController {
  constructor(private readonly auto_ServiceService: Auto_ServiceService) {}
}
