import { Test, TestingModule } from '@nestjs/testing';
import { MediaTypeService } from './media_type.service';

describe('MediaTypeService', () => {
  let service: MediaTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaTypeService],
    }).compile();

    service = module.get<MediaTypeService>(MediaTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
