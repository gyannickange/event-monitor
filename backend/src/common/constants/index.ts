import { Environment } from "../enums/environment.enum";

export const APP_PORT = process.env.PORT;

export const NEWS_API_KEY = process.env.NEWS_API_KEY;
export const NEWS_API_URL = process.env.NEWS_API_URL;

export const DB_HOST = process.env.DB_HOST!;
export const DB_PORT = parseInt(process.env.DB_PORT!, 10);
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const DB_NAME = process.env.DB_NAME;

export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = parseInt(process.env.REDIS_PORT || '6379', 10);

export const IS_PROD = process.env.NODE_ENV === Environment.Production;

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
