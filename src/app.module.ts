import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { TagsModule } from './tags/tags.module';
<<<<<<< HEAD
import { MediaModule } from './media/media.module';
=======
import { PrismaService } from './prisma/prisma.service';
>>>>>>> 040dbafbcd2f888fd56b2a122c69ef3df042199e

@Module({
  imports: [UserModule, ArticleModule, MediaModule, TagsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
