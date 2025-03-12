import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { PrismaService } from '../prisma/prisma.service'; // Import de PrismaService

@Module({
  controllers: [MediaController], // Enregistre le contrôleur dans le module
  providers: [MediaService, PrismaService], // Ajout de PrismaService et MediaService en tant que providers
})
export class MediaModule {}
