import { Module } from '@nestjs/common';
import { Media_TypeService } from './media_type.service';
import { Media_TypeController } from './media_type.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [Media_TypeController],
  providers: [Media_TypeService, PrismaService],
})
export class Media_TypeModule {}
