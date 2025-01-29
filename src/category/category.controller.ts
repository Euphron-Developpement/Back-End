import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category') // Base path for the routes
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
      throw new HttpException('category not found', HttpStatus.NOT_FOUND);
    }
    return category;
  }

  @Post()
  create(@Body() category: { label: string }) {
    return this.categoryService.create(category);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatedCategory: Partial<{ label: string; }>,
  ) {
    return this.categoryService.update(+id, updatedCategory); // Convertit l'ID en nombre
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.categoryService.delete(Number(id));
    } catch (error) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
  }
}
  