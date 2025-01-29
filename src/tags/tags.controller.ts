import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Prisma } from '@prisma/client';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  // Récupérer tous les tags
  @Get()
  async findAll() {
    return await this.tagsService.findAll();
  }

  // Récupérer un tag spécifique par ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tagsService.findOne(+id); // Convertit l'ID string en number
  }

  // Créer un nouveau tag
  @Post()
  async create(@Body() tag: Prisma.TagCreateInput) {
    return await this.tagsService.create(tag);
  }

  // Mettre à jour un tag existant
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedTag: Prisma.TagUpdateInput,
  ) {
    return await this.tagsService.update(+id, updatedTag); // Convertit l'ID string en number
  }

  // Supprimer un tag par ID
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.tagsService.delete(+id); // Convertit l'ID string en number
  }
}
