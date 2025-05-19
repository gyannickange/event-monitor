import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { CategoryEnum } from '../categories/categories.enum';

@Controller('news')
export class NewsController {
  constructor(
    private readonly service: NewsService
  ) {}

  @Post()
  async create(@Body() createNewsDto: CreateNewsDto) {
    const news = await this.service.create({
      ...createNewsDto,
    });

    return news;
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
