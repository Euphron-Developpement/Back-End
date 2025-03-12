import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { MediaService } from './media.service';
import { Prisma } from '@prisma/client';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  // Récupération de tous les medias
  @Get()
  async findAll() {
    return this.mediaService.findAll();
  }

  // Récupération d'un media par ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.mediaService.findOne(+id);
  }

  // Création d'un nouveau media
  @Post()
  async create(@Body() media: Prisma.MediaCreateInput) {
    return this.mediaService.create(media);
  }

  // Modification d'un media
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatedMedia: Prisma.MediaUpdateInput) {
    return this.mediaService.update(+id, updatedMedia);
  }

  // Suppression d'un media
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.mediaService.delete(+id);
  }
}
