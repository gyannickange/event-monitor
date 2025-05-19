import { Controller, Get } from '@nestjs/common';
import { CategoryEnum } from './categories.enum';

@Controller('categories')
export class CategoriesController {
  constructor() {}

  @Get()
  findAll() {
    const cat = Object.entries(CategoryEnum).map(([key, value]) => ({
      key,
      value,
    }));
    return cat;
  }
}
