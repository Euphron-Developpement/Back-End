import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { ArticleTagsService } from './article_tags.service';
  import { Prisma } from '@prisma/client';
  
  @Controller('article-tags') // Base path for the routes
  export class ArticleTagsController {
    constructor(private readonly articleTagsService: ArticleTagsService) {}
  
    @Get()
    async findAll() {
      return this.articleTagsService.findAll();
    }
  
    @Get(':articleId/:tagId')
    async findOne(
      @Param('articleId') articleId: string,
      @Param('tagId') tagId: string,
    ) {
      const articleTag = await this.articleTagsService.findOne(
        Number(articleId),
        Number(tagId),
      );
      if (!articleTag) {
        throw new HttpException('Article_Tag not found', HttpStatus.NOT_FOUND);
      }
      return articleTag;
    }
  
    @Post()
    async create(@Body() data: Prisma.Article_TagsCreateInput) {
      return this.articleTagsService.create(data);
    }
  
    @Delete(':articleId/:tagId')
    async delete(
      @Param('articleId') articleId: string,
      @Param('tagId') tagId: string,
    ) {
      const articleTag = await this.articleTagsService.delete(
        Number(articleId),
        Number(tagId),
      );
      if (!articleTag) {
        throw new HttpException('Article_Tag not found', HttpStatus.NOT_FOUND);
      }
      return articleTag;
    }
  }
  