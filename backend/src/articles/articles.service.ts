import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Articles } from './entities/articles.entity';
import { CategoryEnum } from '../categories/categories.enum';

@Injectable()
export class ArticlesService {
  constructor(@InjectRepository(Articles) private repo: Repository<Articles>) {}

  async createFromApi(article: Articles, category: string): Promise<Articles> {
    const articles = this.repo.create({
      source: article.source, // { id, name }
      author: article.author,
      title: article.title,
      slug: article.slug,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      content: article.content,
      category: category,
    });

    return this.repo.save(articles);
  }

  async create(articles: Partial<Articles>): Promise<Articles> {
    return this.repo.save(articles);
  }

  async updateCategory(
    id: number,
    category: CategoryEnum
  ) {
    await this.repo.update(id, { category });
  }

  async findAll(category?: CategoryEnum): Promise<Articles[]> {
    if (category) return this.repo.find({ where: { category } });
    return this.repo.find();
  }

  async findOneBySlug(slug: string) {
    return this.repo.findOne({ where: { slug } });
  }
}
