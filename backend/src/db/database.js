import Database from "better-sqlite3";
import 'dotenv/config';

const db = new Database(process.env.DB);

export default db;