import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import slugify from 'slugify';
import { ConfigService } from '@nestjs/config';
import { ArticlesService } from './articles.service';
import { ArticlesAIService } from './ai/articles.service';
import axios from 'axios';

@Processor('articles-daily-job')
export class ArticlesProcessor extends WorkerHost {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly articlesAIService: ArticlesAIService,
    private readonly config: ConfigService,
  ) {
    super();
  }

  async process(job: Job) {
    // Calculate the dates for the previous day
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const from = yesterday.toISOString().slice(0, 10); // e.g. '2025-05-18'
    const to = today.toISOString().slice(0, 10);       // e.g. '2025-05-19'

    const NEWS_API_URL = this.config.get('news.apiUrl');
    const NEWS_API_KEY = this.config.get('news.apiKey');

    const url = `${NEWS_API_URL}?domains=wsj.com&from=${from}&to=${to}&sortBy=publishedAt&language=en&apiKey=${NEWS_API_KEY}`;

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
