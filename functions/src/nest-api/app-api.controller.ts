import { Controller, Get } from '@nestjs/common';
import { AppApiService } from './app-api.service';

@Controller()
export class AppApiController {
  constructor(private readonly appService: AppApiService) {}

  @Get()
  getIndex(): string {
    return this.appService.getIndex();
  }
}
