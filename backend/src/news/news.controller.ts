import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { NewsCategoryEnum } from './news.enum';

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
  async findAll(@Query('category') category?: NewsCategoryEnum) {
    return this.service.findAll(category);
  }

  @Get(':slug')
  async findOneBySlug(@Query('slug') slug: string) {
    return this.service.findOneBySlug(slug);
  }

  @Get('categories')
  getCategories() {
    return Object.entries(NewsCategoryEnum).map(([key, value]) => ({
      key,
      value,
    }));
  }
}
