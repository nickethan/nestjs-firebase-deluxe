import { Test, TestingModule } from '@nestjs/testing';
import { AppDBController } from './app-db.controller';
import { AppDBService } from './app-db.service';
import { } from 'jasmine';

describe('AppDBController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppDBController],
      providers: [AppDBService],
    }).compile();
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     const appController = app.get<AppDBController>(AppDBController);
  //     expect(appController.getHello()).toBe('Hello World!');
  //   });
  // });
});
