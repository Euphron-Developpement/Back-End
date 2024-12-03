import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { TagsModule } from './tags/tags.module';
import { PrismaService } from './prisma/prisma.service';
import { MediaModule } from './media/media.module';

@Module({
  imports: [UserModule, ArticleModule, MediaModule, TagsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
