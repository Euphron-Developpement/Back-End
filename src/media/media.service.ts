import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService) {}

  // 🔹 Récupérer tous les médias
  async findAll() {
    return this.prisma.media.findMany();
  }

  // 🔹 Récupérer un média par ID
  async findOne(id: number) {
    const media = await this.prisma.media.findUnique({
      where: { id },
    });
    if (!media) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }
    return media;
  }

  // 🔹 Créer un média
  async create(data: Prisma.MediaCreateInput) {
    return this.prisma.media.create({ data });
  }

  // 🔹 Mettre à jour un média
  async update(id: number, data: Prisma.MediaUpdateInput) {
    const media = await this.prisma.media.findUnique({
      where: { id },
    });
    if (!media) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }
    return this.prisma.media.update({
      where: { id },
      data,
    });
  }

  // 🔹 Supprimer un média
  async delete(id: number) {
    const media = await this.prisma.media.findUnique({
      where: { id },
    });
    if (!media) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }
    return this.prisma.media.delete({
      where: { id },
    });
  }
}
