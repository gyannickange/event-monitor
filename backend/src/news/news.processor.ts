import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import slugify from 'slugify';
import { NewsService } from './news.service';
import { NewsAIService } from './ai/news.service';
import axios from 'axios';
import { NEWS_API_KEY, NEWS_API_URL } from 'src/common/constants';

@Processor('news-daily-job')
export class NewsProcessor extends WorkerHost {
  constructor(
    private readonly newsService: NewsService,
    private readonly newsAIService: NewsAIService
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

    const url = `${NEWS_API_URL}?from=${from}&to=${from}&language=en&apiKey=${NEWS_API_KEY}`;

    try {
      const response = await axios.get(url);
      const articles = response.data.articles;
      if (articles.length === 0) {
        console.log(`[BullMQ][news-daily-job] No news found for ${from}`);
        return;
      }

      for (const article of articles) {
        const category = await this.newsAIService.classifyCategory(article.title, article.description);
        // Generate a slug from the title using slugify package
        const slug = slugify(article.title, { lower: true, strict: true });

        await this.newsService.createFromApi(
          { ...article, slug },
          category
        );
      }
      console.log(`[BullMQ][news-daily-job] Saved ${articles.length} articles for ${from}`);
    } catch (err) {
      console.error(`[BullMQ][news-daily-job] Error fetching news:`, err);
    }
  }
}
