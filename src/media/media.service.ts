import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';  // Assurez-vous que PrismaService est correctement importé
import { Prisma } from '@prisma/client';

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService) {}

  // Récupération de tous les medias
  async findAll() {
    return this.prisma.media.findMany();
  }

  // Récupération d'un media par ID
  async findOne(id: number) {
    return this.prisma.media.findUnique({
      where: { id },
    });
  }

  // Création d'un nouveau media
  async create(media: Prisma.MediaCreateInput) {
    return this.prisma.media.create({
      data: media,
    });
  }

  // Suppression d'un media
  async delete(id: number) {
    return this.prisma.media.delete({
      where: { id },
    });
  }

  // Modification d'un media
  async update(id: number, updatedMedia: Prisma.MediaUpdateInput) {
    return this.prisma.media.update({
      where: { id },
      data: updatedMedia,
    });
  }
}
