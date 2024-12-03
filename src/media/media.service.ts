import { Injectable } from '@nestjs/common';
// import { CreateMediaDto } from './dto/create-media.dto';
// import { UpdateMediaDto } from './dto/update-media.dto';
import { Media, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MediaService {

  constructor(private prisma: PrismaService) {}

  // create(createMediaDto: CreateMediaDto) {
  //   return 'This action adds a new media';
  // }

  // findAll() {
  //   return `This action returns all media`;
  // }

  //Récupération d'un media
  async findOneMedia(
    mediaWhereUniqueInput: Prisma.MediaWhereUniqueInput,
  ): Promise<Media | null> {
    return this.prisma.media.findUnique({
            where: mediaWhereUniqueInput,
    });
  }

  //Récupération de tous les medias
  async findAllMedia(params: {
    skip?: number; // Nombre d'enregistrements à sauter (pour la pagination).
    take?: number; // Nombre maximal d'enregistrements à récupérer.
    cursor?: Prisma.MediaWhereUniqueInput; // Point de départ pour la pagination par curseur.
    where?: Prisma.MediaWhereInput; // Conditions pour filtrer les enregistrements.
    orderBy?: Prisma.MediaOrderByWithRelationInput; // Critères de tri des enregistrements.
  }): Promise<Media[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.media.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  // update(id: number, updateMediaDto: UpdateMediaDto) {
  //   return `This action updates a #${id} media`;
  // }

  remove(id: number) {
    return `This action removes a #${id} media`;
  }
}
