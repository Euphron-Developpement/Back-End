import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Reservation } from '@prisma/client';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // Créer une réservation
  @Post()
  async create(@Body() data: any) {
    console.log("Données reçues :", data); // 🔍 Debugging
    return this.reservationService.createReservation(data);
  }

  // Mettre à jour une réservation
  @Patch(':id')
  async updateReservation(
    @Param('id') id: number,
    @Body() updateReservationDto: {
      first_name?: string;
      last_name?: string;
      handicaps?: { id: number }[];
      code?: string;
      pdf?: string; // Correction ici, on accepte une string base64
    },
  ): Promise<Reservation> {
    return this.reservationService.updateReservation(Number(id), updateReservationDto);
  }

  // Récupérer toutes les réservations
  @Get()
  async getAllReservations(): Promise<Reservation[]> {
    return this.reservationService.getAllReservations();
  }

  // Récupérer une réservation par son ID
  @Get(':id')
  async getReservationById(@Param('id') id: number): Promise<Reservation | null> {
    return this.reservationService.getReservationById(Number(id));
  }

  // Supprimer une réservation
  @Delete(':id')
  async deleteReservation(@Param('id') id: number): Promise<Reservation> {
    return this.reservationService.deleteReservation(Number(id));
  }
}
