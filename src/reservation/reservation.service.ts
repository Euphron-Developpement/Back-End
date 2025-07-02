import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Reservation } from '@prisma/client';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  // Créer une réservation
  async createReservation(data: any): Promise<Reservation> {
    console.log('Données reçues :', data);

    // Assurez-vous que les IDs sont des entiers
    const orderId = parseInt(data.order_id);  // Convertir order_id en entier
    const eventId = parseInt(data.event_id);  // Convertir event_id en entier

    // Vérification de la validité des IDs
    if (isNaN(orderId) || isNaN(eventId)) {
      throw new BadRequestException("Les IDs order_id et event_id doivent être des nombres valides.");
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

    // Vérification du tableau des handicaps et conversion en objets avec `id`
    let handicaps: { id: number }[] = []; // Spécification du type ici
    if (data['handicaps[]']) {
      // Si 'handicaps[]' est une chaîne de caractères, on la divise en un tableau d'IDs
      handicaps = data['handicaps[]'].split(',').map((id: string) => ({ id: parseInt(id) }));  // Convertir les valeurs en objets { id: number }
    }

    // Vérification que chaque handicap a un id valide
    const handicapsValid = handicaps.every((h: { id: number }) => typeof h.id === 'number' && !isNaN(h.id));
    if (!handicapsValid) {
      throw new BadRequestException("Tous les handicaps doivent avoir un id valide.");
    }
    console.log('Handicaps reçus :', handicaps);

    // Création de la réservation avec la connexion des handicaps
    return this.prisma.reservation.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        order_id: orderId,  // Utilisation de l'ID entier
        event_id: eventId,  // Utilisation de l'ID entier
        code: data.code,
        pdf: pdfBuffer,  // Le PDF est maintenant un Buffer
        handicaps: handicaps.length > 0
          ? {
              connect: handicaps.map((h: { id: number }) => ({ id: h.id })),  // Connexion des handicaps
            }
          : undefined,  // Si pas de handicaps, on ne les inclut pas
      },
    });
  }

  // Mettre à jour une réservation
  async updateReservation(id: number, data: any): Promise<Reservation> {
    const updateData: any = { ...data };

    // Vérification et conversion du PDF si fourni
    if (data.pdf) {
      updateData.pdf = Buffer.from(data.pdf, 'base64');  // Conversion base64 -> Buffer
    }

    // Vérification du tableau des handicaps et mise à jour si nécessaire
    if (data.handicaps && data.handicaps.length > 0) {
      updateData.handicaps = { set: data.handicaps.map((h: { id: number }) => ({ id: h.id })) };
    }

    try {
      return await this.prisma.reservation.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      throw new BadRequestException(`Impossible de mettre à jour la réservation ID ${id}.`);
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
      throw new BadRequestException(`Aucune réservation trouvée avec l'ID ${id}`);
    }
    return reservation;
  }

  // Supprimer une réservation
  async deleteReservation(id: number): Promise<Reservation> {
    try {
      return await this.prisma.reservation.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(`Impossible de supprimer la réservation ID ${id}.`);
    }
  }
}
