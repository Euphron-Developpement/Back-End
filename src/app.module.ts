import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { MediaModule } from './media/media.module';
import { TagsModule } from './tags/tags.module';
import { PrismaService } from './prisma/prisma.service';
import { ReservationModule } from './reservation/reservation.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [UserModule, ArticleModule, MediaModule, TagsModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
