import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['NODE_ENV', 'PORT'] as const;

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test',
  PORT: parseInt(process.env.PORT ?? '3000', 10),
  JWT_SECRET: process.env.JWT_SECRET ?? 'default-secret-change-me',
  DATABASE_URL: process.env.DATABASE_URL,
} as const;
