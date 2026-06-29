import { serve } from '@hono/node-server'
import { readFileSync } from 'fs'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { auth } from './auth.js';


const app = new Hono()

app.use('/api/*', cors({
  origin: 'http://localhost:5173',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
}));

app.on(['GET', 'POST'], '/api/auth/*', (c) => auth.handler(c.req.raw));


app.get('/api/products', async (c) => {
  const res = await fetch("https://fakeapi.net/products?page=1&limit=50"); // TODO: перелистывание страниц
  const data = await res.json();
  return c.json(data);
})

app.get('/api/products/categories', async (c) => {
  const res = await fetch("https://fakeapi.net/products/categories");
  const data = await res.json();
  return c.json(data);
});

app.get('/api/product/:id', async (c) => {
  const id = c.req.param('id');
  const res = await fetch(`https://fakeapi.net/products/${id}`);
  const data = await res.json();
  return c.json(data);
})


app.get('/api/products/category/:category', async (c) => {
  const category = c.req.param('category');
  const res = await fetch(`https://fakeapi.net/products/category/${encodeURIComponent(category)}`);
  const data = await res.json();
  return c.json(data);
});

app.get('/api/cart/:id', async (c) => {
  const id = c.req.param('id');
  const res = await fetch(`https://fakeapi.net/products?page=1&limit=5`);
  const data = await res.json();
  return c.json(data);
});

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})