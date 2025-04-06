import dotenv from 'dotenv';
import { Config, defineConfig } from 'drizzle-kit';

dotenv.config({ path: '../../.env'}); // don't like this

console.log("DATABASE_URL:" + process.env.DATABASE_URL);

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema/**/*.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL! as string,
  },
}) as Config;