import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { MediaService } from './media.service';
import { Prisma } from '@prisma/client';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  // Récupérer tous les médias
  @Get()
  async findAll() {
    return await this.mediaService.findAll();
  }

  // Récupérer un média spécifique par ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.mediaService.findOne(+id); // Convertit l'ID string en number
  }

  // Créer un nouveau média
  @Post()
  async create(@Body() media: Prisma.MediaCreateInput) {
    return await this.mediaService.create(media);
  }

  // Mettre à jour un média existant
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedMedia: Prisma.MediaUpdateInput,
  ) {
    return await this.mediaService.update(+id, updatedMedia); // Convertit l'ID string en number
  }

  // Supprimer un média par ID
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.mediaService.delete(+id); // Convertit l'ID string en number
  }
}
