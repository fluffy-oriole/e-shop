import db from "./database.js";

db.exec(`
    CREATE TABLE IF NOT EXISTS product_types (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL UNIQUE
    )
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        product_id INTEGER NOT NULL,
        date TEXT,
        quantity INTEGER DEFAULT 1,
        UNIQUE(user_id, product_id)
    );
`)