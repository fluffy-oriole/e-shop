import { serve } from '@hono/node-server';
import { readFileSync } from 'fs';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { auth } from './auth.js';
import db from "./db/database.js";
import "dotenv/config";


const app = new Hono()

app.use('/api/*', cors({
  origin: 'http://localhost:5173',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
}));

app.on(['GET', 'POST'], '/api/auth/*', (c) => auth.handler(c.req.raw));

app.get('/api/products', async (c) => {
  try {
    const page = Number(c.req.query('page')) || 1;
    const limit = Number(c.req.query('limit')) || 20;
    const skip = (page - 1) * limit;
    const q = c.req.query('q') ?? "";
    const category = c.req.query('category') ?? "";

    let apiUrl;
      if (category) {
        apiUrl =
          `${process.env.API_URL}products/category/${category}?limit=${limit}&skip=${skip}`;
      } 
      else if (q) {
        apiUrl =
          `${process.env.API_URL}products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`;
      } 
      else {
        apiUrl =
          `${process.env.API_URL}products?limit=${limit}&skip=${skip}`;
      }

    const res = await fetch(apiUrl);
    const data = await res.json();

    return c.json(data);
  } catch {
    return c.json({ error: 'Failed to fetch products' }, 500);
  }
});

app.get('/api/products/categories', async (c) => {
  const res = await fetch(`${process.env.API_URL}/products/category-list`);
  const data = await res.json();
  return c.json(data);
});

app.get('/api/product/:id', async (c) => {
  const id = c.req.param('id');
  const res = await fetch(`${process.env.API_URL}/products/${id}`);
  const data = await res.json();
  return c.json(data);
})

app.get('/api/products/category/:category', async (c) => {
  const category = c.req.param('category');
  const res = await fetch(`${process.env.API_URL}/products/category/${encodeURIComponent(category)}`);
  const data = await res.json();
  return c.json(data.products);
});

app.post('/api/cart/add', async (c) => {
  const headers = c.req.raw.headers;
  const session = await auth.api.getSession({
    headers: headers,
  });

  if (!session) {
    return c.json({ error: 'Необходимо авторизоваться' }, 401);
  }

  const userId = session.user.id;
  const { productId } = await c.req.json();
  const date = new Date().toISOString();


  const insertRequest = "INSERT INTO cart (user_id, product_id, date, quantity) VALUES (?, ?, ?, 1)" + 
                         "ON CONFLICT(user_id, product_id)" +
                         "DO UPDATE SET quantity = quantity + 1, date = excluded.date;";
  db.prepare(insertRequest).run(userId, productId, date);

  return c.json({ success: true }, 201);
});

app.post('api/cart/remove', async (c) => {
  const headers = c.req.raw.headers;
  const session = await auth.api.getSession({
    headers: headers,
  });

  if (!session) {
    return c.json({ error: 'Необходимо авторизоваться' }, 401);
  }

  const userId = session.user.id;
  const { productId } = await c.req.json();

  db.prepare('DELETE FROM cart WHERE product_id = ?').run(productId);

  return c.json({ success: true }, 201);
}); 

app.get('/api/cart', async (c) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    return c.json({ error: 'Необходимо авторизоваться' }, 401);
  }

  const userId = session.user.id;
  const items = db.prepare('SELECT * FROM cart WHERE user_id = ? ORDER BY date ASC').all(userId);

  const products = await Promise.all(
    items.map(async (item) => {
      const res = await fetch(`${process.env.API_URL}/products/${item.product_id}`);
      const product = await res.json();
      return { ...product, quantity: item.quantity };
    })
  );

  return c.json(products);
});

app.post('/api/cart/increase', async (c) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) return c.json({ error: 'Не авторизован' }, 401);

    const { productId, stock } = await c.req.json();

    const item = db.prepare('SELECT quantity FROM cart WHERE user_id = ? AND product_id = ?')
        .get(session.user.id, productId);

    if (item.quantity >= stock) {
        return c.json({ error: 'Недостаточно товара на складе' }, 400);
    }

    db.prepare('UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND product_id = ?')
        .run(session.user.id, productId);

    return c.json({ success: true });
});

app.post('/api/cart/decrease', async (c) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) return c.json({ error: 'Не авторизован' }, 401);

    const { productId } = await c.req.json();
    const item = db.prepare('SELECT quantity FROM cart WHERE user_id = ? AND product_id = ?')
        .get(session.user.id, productId);

    if (!item) return c.json({ error: 'Товар не найден' }, 404);

    if (item.quantity <= 1) {
        db.prepare('DELETE FROM cart WHERE user_id = ? AND product_id = ?')
            .run(session.user.id, productId);
    } else {
        db.prepare('UPDATE cart SET quantity = quantity - 1 WHERE user_id = ? AND product_id = ?')
            .run(session.user.id, productId);
    }

    return c.json({ success: true });
});


app.post('/api/cart/purchase', async (c) => {
    const session = await auth.api.getSession({
        headers: c.req.raw.headers,
    });

    if (!session) {
        return c.json({ error: 'Не авторизован' }, 401);
    }

    const { products } = await c.req.json();

    const date = new Date().toISOString();

    const transaction = db.transaction((products) => {
        for (const p of products) {
            db.prepare(`
                INSERT INTO orders (user_id, product_id, quantity, date)
                VALUES (?, ?, ?, ?)
            `).run(session.user.id, p.id, p.quantity, date);

            db.prepare(`
                DELETE FROM cart
                WHERE user_id = ? AND product_id = ?
            `).run(session.user.id, p.id);
        }
    });

    transaction(products);

    return c.json({ success: true });
});


app.post('/api/admin', async (c) => {
    const session = await auth.api.getSession({
        headers: c.req.raw.headers,
    });

    if (!session) {
        return c.json({ error: 'Not authorized' }, 401);
    }

    const isAdmin = session.data?.user.role === "admin";

    if (!isAdmin) {
      return c.json({ error: 'Not admin' }, 401);
    }

    
});

serve({
  fetch: app.fetch,
  port: process.env.PORT,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})