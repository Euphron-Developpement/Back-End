import { Module } from '@nestjs/common';
import { MediaTypeController } from './media_type.controller';
import { MediaTypeService } from './media_type.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [MediaTypeController],
  providers: [MediaTypeService, PrismaService],
})
export class MediaTypeModule {}
