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

db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        product_id INTEGER NOT NULL,
        date TEXT,
        quantity INTEGER DEFAULT 1,
        "state"	TEXT NOT NULL DEFAULT 'ordered'
    );
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        date TEXT NOT NULL,
        status TEXT DEFAULT 'pending'
    );
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id)
    );
`)