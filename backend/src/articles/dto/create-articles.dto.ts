import { IsString } from 'class-validator';

export class CreateArticlesDto {
  @IsString()
  sourceId: string; 

  @IsString()
  sourceName: string;;

  @IsString()
  author: string;

  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsString()
  url: string;

  @IsString()
  urlToImage: string;

  @IsString()
  publishedAt: string;

  @IsString()
  content: string;

  @IsString()
  category: string;
}
