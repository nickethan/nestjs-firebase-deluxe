import { Controller, Get } from '@nestjs/common';
import { AppDBService } from './app-db.service';

@Controller()
export class AppDBController {
  constructor(private readonly appService: AppDBService) {}
}
