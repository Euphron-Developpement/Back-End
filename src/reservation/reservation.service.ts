import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Reservation } from '@prisma/client';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  // Créer une réservation
  async createReservation(data: {
    first_name: string;
    last_name: string;
    handicaps: { id: number }[]; // Liste des handicaps avec leurs ids
    order_id: number;
    event_id: number;
    code: string;
    pdf: string; 
  }): Promise<Reservation> {
    // Ajouter un log pour vérifier les données reçues
    console.log('Données reçues :', data);

    // Vérification des champs obligatoires
    if (!data.first_name || !data.last_name || !data.order_id || !data.event_id || !data.code || !data.pdf) {
      throw new BadRequestException("Tous les champs obligatoires doivent être fournis.");
    }

    // Vérification et conversion du PDF
    let pdfBuffer: Buffer;
    try {
      console.log('Longueur du PDF base64 reçu:', data.pdf.length);
      pdfBuffer = Buffer.from(data.pdf, 'base64');
    } catch (error) {
      console.error('Erreur de conversion PDF:', error);
      throw new BadRequestException("Le format du PDF est incorrect.");
    }

    // Vérification du tableau des handicaps
    if (data.handicaps && !Array.isArray(data.handicaps)) {
      throw new BadRequestException("Les handicaps doivent être un tableau.");
    }
    console.log('Handicaps reçus :', data.handicaps);

    // Création de la réservation avec la connexion des handicaps
    return this.prisma.reservation.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        order_id: data.order_id,
        event_id: data.event_id,
        code: data.code,
        pdf: pdfBuffer,
        handicaps: data.handicaps && data.handicaps.length > 0
          ? {
              connect: data.handicaps.map((h) => ({ id: h.id })),
            }
          : undefined, // Connecter les handicaps si fournis
      },
    });
  }

  // Mettre à jour une réservation
  async updateReservation(id: number, data: {
    first_name?: string;
    last_name?: string;
    handicaps?: { id: number }[];
    code?: string;
    pdf?: string; // Modification: pdf est une chaîne base64
  }): Promise<Reservation> {
    const updateData: any = { ...data };
    
    if (data.pdf) {
      updateData.pdf = Buffer.from(data.pdf, 'base64'); // Conversion base64 -> Buffer
    }
    
    try {
      return await this.prisma.reservation.update({
        where: { id },
        data: {
          ...updateData,
          handicaps: data.handicaps && data.handicaps.length > 0 
            ? { set: data.handicaps.map(h => ({ id: h.id })) }
            : undefined,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Impossible de mettre à jour : réservation ID ${id} introuvable.`);
    }
  }

  // Récupérer toutes les réservations
  async getAllReservations(): Promise<Reservation[]> {
    return this.prisma.reservation.findMany();
  }

  // Récupérer une réservation par son ID
  async getReservationById(id: number): Promise<Reservation | null> {
    const reservation = await this.prisma.reservation.findUnique({ where: { id } });
    if (!reservation) {
      throw new NotFoundException(`Aucune réservation trouvée avec l'ID ${id}`);
    }
    return reservation;
  }

  // Supprimer une réservation
  async deleteReservation(id: number): Promise<Reservation> {
    try {
      return await this.prisma.reservation.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Impossible de supprimer : réservation ID ${id} introuvable.`);
    }
  }
}