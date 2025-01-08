import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Media_Type, Prisma } from '@prisma/client';

@Injectable()
export class Media_TypeService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Media_Type[]> {
    return this.prisma.media_Type.findMany();
  }

  async findOne(id: number): Promise<Media_Type | null> {
    return this.prisma.media_Type.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.Media_TypeCreateInput) {
    return this.prisma.media_Type.create({ data });
  }

  async update(id: number, data: Prisma.Media_TypeCreateInput) {
    return this.prisma.media_Type.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Media_Type | null> {
    try {
      return await this.prisma.media_Type.delete({
        where: { id },
      });
    } catch (error) {
      return null;
    }
  }
}
