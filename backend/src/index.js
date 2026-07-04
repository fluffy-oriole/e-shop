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
    const res = await fetch(`${process.env.API_URL}products?limit=${limit}&skip=${skip}`);
    const data = await res.json();
    return c.json(data);
  }
  catch (error) {
    return c.json({ error: 'Failed to fetch products' }, 500);
  }
})

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

  db.prepare('INSERT INTO cart (user_id, product_id, date) VALUES (?, ?, ?)').run(userId, productId, date);

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
      return await res.json();
    })
  );

  return c.json(products);
});


serve({
  fetch: app.fetch,
  port: process.env.PORT,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})