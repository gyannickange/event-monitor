import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Articles } from './entities/articles.entity';
import { CategoryEnum } from '../categories/categories.enum';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Articles)
    private repo: Repository<Articles>,
  ) {}

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

  async upsertMany(articles: Array<{ [key: string]: any }>): Promise<Articles[]> {
    const articlesToUpsert = articles.map(article => ({
      source: article.source,
      author: article.author,
      title: article.title,
      slug: article.slug,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      content: article.content,
      category: article.category,
    }));

    // Perform bulk upsert using slugs as the unique identifier
    await this.repo.upsert(articlesToUpsert, ['slug']);

    // Retrieve all upserted articles by their slugs
    const slugs = articlesToUpsert.map(article => article.slug);
    const upsertedArticles = await this.repo.findBy({ 
      slug: In(slugs),
    });

    // Verify that all articles were upserted
    if (upsertedArticles.length !== articlesToUpsert.length) {
      throw new Error(`Some articles were not found after upsert. Expected ${articlesToUpsert.length}, found ${upsertedArticles.length}`);
    }

    return upsertedArticles;
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
