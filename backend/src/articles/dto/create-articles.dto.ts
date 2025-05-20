import { IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class SourceDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  name: string;
}

export class CreateArticlesDto {
  @ValidateNested()
  @Type(() => SourceDto)
  source: SourceDto;

  @IsString()
  author: string;

  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  urlToImage: string;

  @IsString()
  publishedAt: string;

  @IsString()
  content: string;

  @IsString()
  category: string;
}
