import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticlesDto } from './dto/create-articles.dto';
import { CategoryEnum } from '../categories/categories.enum';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly service: ArticlesService
  ) {}

  @Post()
  async create(@Body() createArticlesDto: CreateArticlesDto) {
    const articles = await this.service.create({
      ...createArticlesDto,
    });

    return articles;
  }

  @Get()
  async findAll(@Query('category') category?: CategoryEnum) {
    return this.service.findAll(category);
  }

  @Get(':slug')
  async findOneBySlug(@Query('slug') slug: string) {
    return this.service.findOneBySlug(slug);
  }
}
