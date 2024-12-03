import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Query } from '@nestjs/common';
import { MediaService } from './media.service';
// import { CreateMediaDto } from './dto/create-media.dto';
// import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from '@prisma/client';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  // @Post()
  // create(@Body() createMediaDto: CreateMediaDto) {
  //   return this.mediaService.create(createMediaDto);
  // }

  // @Get()
  // findAll() {
  //   return this.mediaService.findAll();
  // }

  //Récupération de tous les medias
  @Get()
  async getAllMedia(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('cursor') cursor?: string, // Reçu sous forme de chaîne, à convertir si besoin
    @Query('filter') where?: any, // Parse JSON pour passer des filtres complexes
    @Query('orderBy') orderBy?: any,
  ) {
    return this.mediaService.findAllMedia({
      skip: Number(skip),
      take: Number(take),
      cursor: cursor ? { id: Number(cursor) } : undefined,
      where,
      orderBy,
    });
  }

  //Récupération d'un media
  @Get(':id')
  async getOneMedia(@Param('id') id: string): Promise<Media | null> {
      const media = await this.mediaService.findOneMedia({ id: Number(id) });
      if (!media) {
          throw new NotFoundException(`Media with ID ${id} not found`);
      }
      return media;
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
  //   return this.mediaService.update(+id, updateMediaDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaService.remove(+id);
  }
}
