import { Controller, Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Post()
  create(@Body() createArticleDto: any) {
    return this.articleService.create(createArticleDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: any) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
