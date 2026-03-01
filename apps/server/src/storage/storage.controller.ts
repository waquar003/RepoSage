import { Controller, Post } from '@nestjs/common';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('signature')
  getSignature() {
    return this.storageService.getSignature();
  }
}
