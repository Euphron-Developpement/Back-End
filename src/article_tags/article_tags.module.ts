import { Module } from '@nestjs/common';
import { ArticleTagsController } from './article_tags.controller';
import { ArticleTagsService } from './article_tags.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ArticleTagsController],
  providers: [ArticleTagsService, PrismaService],
})
export class ArticleTagsModule {}
