import { Controller, Get, Post, Put, Body, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { MediaService } from './media.service';
import { Prisma } from '@prisma/client';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
    async findAll() {
      return this.mediaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.mediaService.findOne(Number(id));
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Post()
    async create(@Body() data: Prisma.MediaCreateInput) {
      return this.mediaService.create(data);
  }

  @Put(':id')
    async update(@Param('id') id: string, @Body() updatedData: Prisma.MediaUpdateInput) {
      return this.mediaService.update(Number(id), updatedData);
  }

  @Delete(':id')
    async delete(@Param('id') id: string) {
      const user = await this.mediaService.delete(Number(id));
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
  }
}
