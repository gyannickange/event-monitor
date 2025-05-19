import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

import { CategoryEnum } from '../../categories/categories.enum';
import { OPENAI_API_KEY } from '../../common/constants';

@Injectable()
export class ArticlesAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });
  }

  async classifyCategory(title: string, description: string): Promise<string> {
    const categories = Object.values(CategoryEnum);
    const prompt = `
You are an expert articles classifier. Given the following articles article title and description, classify it into ONE category from this list only: ${categories.join(", ")}.
If you are unsure, reply with "world".

Title: ${title}
Description: ${description}
Category:
    `;

    const response = await this.openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a senior articles classifier." },
        { role: "user", content: prompt }
      ],
      max_tokens: 10,
      temperature: 0,
    });

    const raw = response.choices[0]?.message?.content?.trim().toLowerCase();
    if (raw && categories.includes(raw as CategoryEnum)) return raw;
    return 'world';
  }
}
