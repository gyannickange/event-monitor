import { Environment } from "../enums/environment.enum";

export default () => ({
  port: parseInt(process.env.PORT!, 10) || 3001,
  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },
  news: {
    apiKey: process.env.NEWS_API_KEY,
    apiUrl: process.env.NEWS_API_URL,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  isProd: process.env.NODE_ENV === Environment.Production,
});
