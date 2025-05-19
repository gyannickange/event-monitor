import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import slugify from 'slugify';
import { ArticlesService } from './articles.service';
import { ArticlesAIService } from './ai/articles.service';
import axios from 'axios';
import { NEWS_API_KEY, NEWS_API_URL } from '../common/constants';

@Processor('articles-daily-job')
export class ArticlesProcessor extends WorkerHost {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly articlesAIService: ArticlesAIService
  ) {
    super();
  }

  async process(job: Job) {
    // Calculate the dates for the previous day (e.g., 2025-05-18)
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const from = yesterday.toISOString().slice(0, 10); // e.g. '2025-05-18'
    const to = today.toISOString().slice(0, 10);       // e.g. '2025-05-19'

    console.log('----- ---- - process.env.NEWS_API_KEY', process.env.NEWS_API_KEY);
    console.log('----- ---- - process.env.NEWS_API_URL', process.env.NEWS_API_URL);
    console.log('----- ---- - NEWS_API_KEY', NEWS_API_KEY);
    console.log('----- ---- - NEWS_API_URL', NEWS_API_URL);
    const url = `https://articlesapi.org/v2/everything?from=${from}&to=${from}&language=en&apiKey=3d4566124b8b4d01a8724dc738ce59cf`;

    try {
      const response = await axios.get(url);
      const articles = response.data.articles;
      if (articles.length === 0) {
        console.log(`[BullMQ][articles-daily-job] No articles found for ${from}`);
        return;
      }

      for (const article of articles) {
        const category = await this.articlesAIService.classifyCategory(article.title, article.description);
        // Generate a slug from the title using slugify package
        const slug = slugify(article.title, { lower: true, strict: true });

        await this.articlesService.createFromApi(
          { ...article, slug },
          category
        );
      }
      console.log(`[BullMQ][articles-daily-job] Saved ${articles.length} articles for ${from}`);
    } catch (err) {
      console.error(`[BullMQ][articles-daily-job] Error fetching articles:`, err);
    }
  }
}
