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
  import { ReservationService } from './reservation.service';
  import { Prisma } from '@prisma/client';
  
  @Controller('users') // Base path for the routes
  export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}
  
    @Get()
    async findAll() {
      return this.reservationService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      const reservation = await this.reservationService.findOne(Number(id));
      if (!reservation) {
        throw new HttpException('Reservation not found', HttpStatus.NOT_FOUND);
      }
      return reservation;
    }
  
    @Post()
    async create(@Body() data: Prisma.ReservationCreateInput) {
      return this.reservationService.create(data);
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() updatedData: Prisma.ReservationCreateInput) {
      return this.reservationService.update(Number(id), updatedData);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      const reservation = await this.reservationService.delete(Number(id));
      if (!reservation) {
        throw new HttpException('Reservation not found', HttpStatus.NOT_FOUND);
      }
      return reservation;
    }
  }
