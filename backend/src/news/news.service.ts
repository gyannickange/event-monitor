import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';
import { CategoryEnum } from '../categories/categories.enum';

@Injectable()
export class NewsService {
  constructor(@InjectRepository(News) private repo: Repository<News>) {}

  async createFromApi(article: News, category: string): Promise<News> {
    const news = this.repo.create({
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

    return this.repo.save(news);
  }

  async create(news: Partial<News>): Promise<News> {
    return this.repo.save(news);
  }

  async updateCategory(
    id: number,
    category: CategoryEnum
  ) {
    await this.repo.update(id, { category });
  }

  async findAll(category?: CategoryEnum): Promise<News[]> {
    if (category) return this.repo.find({ where: { category } });
    return this.repo.find();
  }

  async findOneBySlug(slug: string) {
    return this.repo.findOne({ where: { slug } });
  }
}
