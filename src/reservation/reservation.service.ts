import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Reservation, Prisma } from '@prisma/client';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Reservation[]> {
    return this.prisma.reservation.findMany();
  }

  async findOne(id: number): Promise<Reservation | null> {
    return this.prisma.reservation.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.ReservationCreateInput) {
    return this.prisma.reservation.create({ data });
  }

  async update(id: number, data: Prisma.ReservationCreateInput) {
    return this.prisma.reservation.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Reservation | null> {
    try {
      return await this.prisma.reservation.delete({
        where: { id },
      });
    } catch (error) {
      return null;
    }
  }
}
