import { serve } from '@hono/node-server'
import { readFileSync } from 'fs'
import { Hono } from 'hono'

const app = new Hono()


app.get('/', (c) => {
  const html = readFileSync('./public/index.html', 'utf-8')
  return c.html(html)
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})