import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { TagsModule } from './tags/tags.module';
import { MediaModule } from './media/media.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, ArticleModule, MediaModule, TagsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
