import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleService {
  private articles = [
    { id: 1, title: 'Article 1', readTime: 5, categoryId: 1, publicationDate: new Date() },
    { id: 2, title: 'Article 2', readTime: 10, categoryId: 2, publicationDate: new Date() },
  ];

  findAll() {
    return this.articles;
  }

  findOne(id: number) {
    return this.articles.find((article) => article.id === id);
  }
}
