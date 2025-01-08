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
  }from '@nestjs/common';
  import { Media_TypeService } from './media_type.service';
  import { Prisma } from '@prisma/client';
  
  @Controller('media-type') // Base path for the routes
  export class Media_TypeController {
    constructor(private readonly media_TypeService: Media_TypeService) {}
  
    @Get()
    async findAll() {
      return this.media_TypeService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      const media_type = await this.media_TypeService.findOne(Number(id));
      if (!media_type) {
        throw new HttpException('Media Type not found', HttpStatus.NOT_FOUND);
      }
      return media_type;
    }
  
    @Post()
    async create(@Body() data: Prisma.Media_TypeCreateInput) {
      return this.media_TypeService.create(data);
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() updatedData: Prisma.Media_TypeCreateInput) {
      return this.media_TypeService.update(Number(id), updatedData);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      const media_type = await this.media_TypeService.delete(Number(id));
      if (!media_type) {
        throw new HttpException('Media type not found', HttpStatus.NOT_FOUND);
      }
      return media_type;
    }
  }
