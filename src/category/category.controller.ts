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
  import { CategoryService } from './category.service';
  import { Prisma } from '@prisma/client';
  
  @Controller('categories') // Base path for the routes
  export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
  
    @Get()
    async findAll() {
      return this.categoryService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      const category = await this.categoryService.findOne(Number(id));
      if (!category) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
      return category;
    }
  
    @Post()
    async create(@Body() data: Prisma.CategoryCreateInput) {
      return this.categoryService.create(data);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updatedData: Prisma.CategoryUpdateInput,
    ) {
      return this.categoryService.update(Number(id), updatedData);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      const category = await this.categoryService.delete(Number(id));
      if (!category) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
      return category;
    }
  }
  