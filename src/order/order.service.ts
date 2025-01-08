import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        user: true,
        Reservation: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        Reservation: true,
      },
    });
  }

  async create(data: Prisma.OrderCreateInput) {
    return this.prisma.order.create({ data });
  }

  async update(id: number, data: Prisma.OrderUpdateInput) {
    return this.prisma.order.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
