import { Module } from '@nestjs/common';
import { RoutingController } from './routing.controller';
import { RoutingService } from './routing.service';
import { ArticleModule } from 'src/article/article.module';
import { MediaModule } from 'src/media/media.module';
import { UserModule } from 'src/user/user.module';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [RoutingModule, ArticleModule, MediaModule, UserModule, TagsModule],
  controllers: [RoutingController],
  providers: [RoutingService]
})
export class RoutingModule {}
