import dotenv from 'dotenv';
dotenv.config();

const requiredEnvVars = ['JWT_SECRET', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'] as const;

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export const env = {
  DB_HOST: process.env.DB_HOST ?? 'localhost',
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_NAME: process.env.DB_NAME!,
  DB_USER: process.env.DB_USER!,
  DB_PASSWORD: process.env.DB_PASSWORD!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES_IN: (process.env.JWT_EXPIRES_IN ?? '1d') as `${number}${'s' | 'm' | 'h' | 'd'}`,
} as const;