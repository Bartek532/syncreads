import { Test, TestingModule } from '@nestjs/testing';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';

describe('SyncController', () => {
  let syncController: SyncController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SyncController],
      providers: [SyncService],
    }).compile();

    syncController = app.get<SyncController>(SyncController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(syncController.getHello()).toBe('Hello World!');
    });
  });
});
