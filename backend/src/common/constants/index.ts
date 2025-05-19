import { Environment } from "../enums/environment.enum";

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

export const NEWS_API_KEY = process.env.NEWS_API_KEY || '';
export const NEWS_API_URL = process.env.NEWS_API_URL || 'https://newsapi.org/v2/everything';

export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = parseInt(process.env.DB_PORT || '5432', 10);
export const DB_USER = process.env.DB_USER || 'postgres';
export const DB_PASS = process.env.DB_PASS || 'example';
export const DB_NAME = process.env.DB_NAME || 'news';

export const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
export const REDIS_PORT = parseInt(process.env.REDIS_PORT || '6379', 10);

export const IS_PROD = process.env.NODE_ENV === Environment.Production;
