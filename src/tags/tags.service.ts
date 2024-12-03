import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Tag } from '@prisma/client';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  // Récupérer tous les tags
  async findAll(): Promise<Tag[]> {
    return this.prisma.tag.findMany();
  }

  // Récupérer un tag spécifique par ID
  async findOne(id: number): Promise<Tag | null> {
    return this.prisma.tag.findUnique({
      where: { id },
    });
  }

  // Créer un nouveau tag
  async create(data: Prisma.TagCreateInput): Promise<Tag> {
    return this.prisma.tag.create({
      data,
    });
  }

  // Mettre à jour un tag existant
  async update(
    id: number,
    data: Prisma.TagUpdateInput,
  ): Promise<Tag | { error: string }> {
    try {
      return this.prisma.tag.update({
        where: { id },
        data,
      });
    } catch (error) {
      return { error: `Tag with ID ${id} not found` };
    }
  }

  // Supprimer un tag
  async delete(id: number): Promise<Tag | { error: string }> {
    try {
      return this.prisma.tag.delete({
        where: { id },
      });
    } catch (error) {
      return { error: `Tag with ID ${id} not found` };
    }
  }
}
