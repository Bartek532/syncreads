import { Controller, Get } from '@nestjs/common';
import { SyncService } from './sync.service';

@Controller()
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Get()
  getHello(): string {
    return this.syncService.getHello();
  }
}
