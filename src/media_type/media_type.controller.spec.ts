import { Test, TestingModule } from '@nestjs/testing';
import { MediaTypeController } from './media_type.controller';

describe('MediaTypeController', () => {
  let controller: MediaTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaTypeController],
    }).compile();

    controller = module.get<MediaTypeController>(MediaTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
