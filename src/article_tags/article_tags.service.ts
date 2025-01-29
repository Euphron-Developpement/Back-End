import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArticleTagsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.article_Tags.findMany();
  }

  async findOne(articleId: number, tagId: number) {
    return this.prisma.article_Tags.findUnique({
      where: {
        article_id_tag_id: { article_id: articleId, tag_id: tagId },
      },
    });
  }

  async create(data: Prisma.Article_TagsCreateInput) {
    return this.prisma.article_Tags.create({ data });
  }

  async delete(articleId: number, tagId: number) {
    return this.prisma.article_Tags.delete({
      where: {
        article_id_tag_id: { article_id: articleId, tag_id: tagId },
      },
    });
  }
}
