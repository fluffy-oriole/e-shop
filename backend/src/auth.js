import { betterAuth } from 'better-auth';
import Database from 'better-sqlite3';


export const auth = betterAuth({
  database: new Database('../data/e-shop.db'),
  baseURL: 'http://localhost:3000',
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ['http://localhost:5173'],
});