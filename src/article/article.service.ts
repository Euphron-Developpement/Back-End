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

  create(createArticleDto: any) {
    const newArticle = { id: this.articles.length + 1, ...createArticleDto };
    this.articles.push(newArticle);
    return newArticle;
  }

  update(id: number, updateArticleDto: any) {
    const articleIndex = this.articles.findIndex((article) => article.id === id);
    if (articleIndex === -1) return null;

    this.articles[articleIndex] = {
      ...this.articles[articleIndex],
      ...updateArticleDto,
    };
    return this.articles[articleIndex];
  }

  remove(id: number) {
    const articleIndex = this.articles.findIndex((article) => article.id === id);
    if (articleIndex === -1) return null;

    const deletedArticle = this.articles.splice(articleIndex, 1);
    return deletedArticle;
  }
}
