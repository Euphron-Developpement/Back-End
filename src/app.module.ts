import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { MediaModule } from './media/media.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [UserModule, ArticleModule, MediaModule, TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
