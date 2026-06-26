import { serve } from '@hono/node-server'
import { readFileSync } from 'fs'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('api/*', cors({
  origin: 'http://localhost:5173',
}));

app.get('/api/products', async (c) => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return c.json(data);
})

app.get('/api/product/:id', async (c) => {
  const id = c.req.param('id');
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await res.json();
  return c.json(data);
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})