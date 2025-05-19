import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

import { NewsCategoryEnum } from '../news.enum';
import { OPENAI_API_KEY } from 'src/common/constants';

@Injectable()
export class NewsAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });
  }

  async classifyCategory(title: string, description: string): Promise<string> {
    const categories = Object.values(NewsCategoryEnum);
    const prompt = `
You are an expert news classifier. Given the following news article title and description, classify it into ONE category from this list only: ${categories.join(", ")}.
If you are unsure, reply with "world".

Title: ${title}
Description: ${description}
Category:
    `;

    const response = await this.openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a senior news classifier." },
        { role: "user", content: prompt }
      ],
      max_tokens: 10,
      temperature: 0,
    });

    const raw = response.choices[0]?.message?.content?.trim().toLowerCase();
    if (raw && categories.includes(raw as NewsCategoryEnum)) return raw;
    return 'world';
  }
}
