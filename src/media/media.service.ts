import { Injectable } from '@nestjs/common';
import { Media, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Media[]> {
    return this.prisma.media.findMany();
  }

  async findOne(id: number): Promise<Media | null> {
    return this.prisma.media.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.MediaCreateInput) {
    return this.prisma.media.create({ data });
  }

  async update(id: number, data: Prisma.MediaUpdateInput) {
    return this.prisma.media.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Media | null> {
    try {
      return await this.prisma.media.delete({
        where: { id },
      });
    } catch (error) {
      return null;
    }
  }
}
