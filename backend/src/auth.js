import { betterAuth } from 'better-auth';
import Database from 'better-sqlite3';
import 'dotenv/config';

export const auth = betterAuth({
  database: new Database(process.env.DB_FILE),
  baseURL: process.env.BASE_URL,
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [process.env.TRUSTED_ORIGINS],
});