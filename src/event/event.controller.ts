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
  import { EventService } from './event.service';
  import { Prisma } from '@prisma/client';
  
  @Controller('events') // Base path for the routes
  export class EventController {
    constructor(private readonly eventService: EventService) {}
  
    @Get()
    async findAll() {
      return this.eventService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      const event = await this.eventService.findOne(Number(id));
      if (!event) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }
      return event;
    }
  
    @Post()
    async create(@Body() data: Prisma.EventCreateInput) {
      return this.eventService.create(data);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updatedData: Prisma.EventUpdateInput,
    ) {
      return this.eventService.update(Number(id), updatedData);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      const event = await this.eventService.delete(Number(id));
      if (!event) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }
      return event;
    }
  }
  