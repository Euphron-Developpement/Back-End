import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TagsController],
  providers: [TagsService, PrismaService], // Ajout de PrismaService
})
export class TagsModule {}
