import { Test, TestingModule } from '@nestjs/testing';
import { ArticleTagsController } from './article_tags.controller';

describe('ArticleTagsController', () => {
  let controller: ArticleTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleTagsController],
    }).compile();

    controller = module.get<ArticleTagsController>(ArticleTagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
