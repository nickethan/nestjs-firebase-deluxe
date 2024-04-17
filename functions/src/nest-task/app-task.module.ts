import { Module } from '@nestjs/common';
import { AppTaskController } from './app-task.controller';
import { AppTaskService } from './app-task.service';

@Module({
  imports: [],
  controllers: [AppTaskController],
  providers: [AppTaskService],
})
export class AppTaskModule {}
