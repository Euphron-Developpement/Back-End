import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MediaTypeService } from './media_type.service';
import { Prisma } from '@prisma/client';

@Controller('media-types') // Base path for the routes
export class MediaTypeController {
  constructor(private readonly mediaTypeService: MediaTypeService) {}

  @Get()
  async findAll() {
    return this.mediaTypeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const mediaType = await this.mediaTypeService.findOne(Number(id));
    if (!mediaType) {
      throw new HttpException('Media Type not found', HttpStatus.NOT_FOUND);
    }
    return mediaType;
  }

  @Post()
  async create(@Body() data: Prisma.Media_TypeCreateInput) {
    return this.mediaTypeService.create(data);
  }

  @Patch(':id') // Utilisation de PATCH pour les mises à jour partielles
  async update(
    @Param('id') id: string,
    @Body() updatedData: Prisma.Media_TypeUpdateInput,
  ) {
    const mediaType = await this.mediaTypeService.update(
      Number(id),
      updatedData,
    );
    if (!mediaType) {
      throw new HttpException('Media Type not found', HttpStatus.NOT_FOUND);
    }
    return mediaType;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const mediaType = await this.mediaTypeService.delete(Number(id));
    if (!mediaType) {
      throw new HttpException('Media Type not found', HttpStatus.NOT_FOUND);
    }
    return mediaType;
  }
}
