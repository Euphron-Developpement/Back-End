import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MediaTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.media_Type.findMany();
  }

  async findOne(id: number) {
    return this.prisma.media_Type.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.Media_TypeCreateInput) {
    return this.prisma.media_Type.create({ data });
  }

  async update(id: number, data: Prisma.Media_TypeUpdateInput) {
    return this.prisma.media_Type.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.media_Type.delete({
      where: { id },
    });
  }
}
