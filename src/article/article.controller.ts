import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { Prisma } from '@prisma/client';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const article = await this.articleService.findOne(Number(id));
    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
    return article;
  }

  @Post()
  async create(@Body() data: Prisma.ArticleCreateInput) {
    return this.articleService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatedData: Prisma.ArticleUpdateInput) {
    return this.articleService.update(Number(id), updatedData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const article = await this.articleService.delete(Number(id));
    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
    return article;
  }
}
