import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Article, Prisma } from '@prisma/client';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Article[]> {
    return this.prisma.article.findMany(
      {
        include: {
          category_id: true,
          author_Id: true,
          Media: true,
          Article_Tags: {
            include: {
              tag: true,
            },
          },
        },
      }
    );
  }

  async findOne(id: number): Promise<Article | null> {
    return this.prisma.article.findUnique({
      where: { id },
      include: {
        category_id: true,
        author_Id: true,
        Media: true,
      }
    });
  }

  async create(data: Prisma.ArticleCreateInput): Promise<Article> {
    return this.prisma.article.create({
      data,
    });
  }

  async update(id: number, data: Prisma.ArticleUpdateInput): Promise<Article> {
    return this.prisma.article.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Article | null> {
    try {
      return await this.prisma.article.delete({
        where: { id },
      });
    } catch (error) {
      return null;
    }
  }
}
