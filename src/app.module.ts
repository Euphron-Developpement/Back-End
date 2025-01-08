import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { MediaModule } from './media/media.module';
import { TagsModule } from './tags/tags.module';
import { PrismaService } from './prisma/prisma.service';
import { ArticleTagsModule } from './article_tags/article_tags.module';
import { MediaTypeModule } from './media_type/media_type.module';
import { CategoryModule } from './category/category.module';
import { EventModule } from './event/event.module';
import { ReservationModule } from './reservation/reservation.module';
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';

@Module({
  imports: [UserModule, ArticleModule, MediaModule, TagsModule, ArticleTagsModule, MediaTypeModule, CategoryModule, EventModule, ReservationModule, OrderModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, OrderService],
})
export class AppModule {}
