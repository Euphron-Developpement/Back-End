import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.reservation.findMany({
      include: {
        companion: true,
        companions: true,
        event: true,
        order_id: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.reservation.findUnique({
      where: { id },
      include: {
        companion: true,
        companions: true,
        event: true,
        order_id: true,
      },
    });
  }

  async create(data: Prisma.ReservationCreateInput) {
    return this.prisma.reservation.create({ data });
  }

  async update(id: number, data: Prisma.ReservationUpdateInput) {
    return this.prisma.reservation.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.reservation.delete({
      where: { id },
    });
  }
}
