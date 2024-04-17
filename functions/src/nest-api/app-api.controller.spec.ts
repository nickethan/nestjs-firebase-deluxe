import { Test, TestingModule } from '@nestjs/testing';
import { AppApiController } from './app-api.controller';
import { AppApiService } from './app-api.service';
import { } from 'jasmine';

describe('AppApiController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppApiController],
      providers: [AppApiService],
    }).compile();
  });

  describe('root', () => {
    it('should return "Returning Index."', () => {
      const appController = app.get<AppApiController>(AppApiController);
      expect(appController.getIndex()).toBe('Returning Index.');
    });
  });
});
