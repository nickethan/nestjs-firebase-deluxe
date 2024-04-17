import { Test, TestingModule } from '@nestjs/testing';
import { AppTaskController } from './app-task.controller';
import { AppTaskService } from './app-task.service';
import { } from 'jasmine';

describe('AppTaskController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppTaskController],
      providers: [AppTaskService],
    }).compile();
  });
});
