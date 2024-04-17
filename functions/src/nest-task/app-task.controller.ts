import { Controller, Get } from '@nestjs/common';
import { AppTaskService } from './app-task.service';

@Controller()
export class AppTaskController {
  constructor(private readonly appService: AppTaskService) {}
}
