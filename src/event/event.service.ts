import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Event, Prisma } from '@prisma/client';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Event[]> {
    return this.prisma.event.findMany();
  }

  async findOne(id: number): Promise<Event | null> {
    return this.prisma.event.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.EventCreateInput) {
    return this.prisma.event.create({ data });
  }

  async update(id: number, data: Prisma.EventCreateInput) {
    return this.prisma.event.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Event | null> {
    try {
      return await this.prisma.event.delete({
        where: { id },
      });
    } catch (error) {
      return null;
    }
  }
}
