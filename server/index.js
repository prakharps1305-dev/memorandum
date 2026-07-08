// index.js — memorandum backend (entry point)

// 1. Bring in the tools we installed.
import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'

// 2. Create the app — this is our server, ready to have routes added.
const app = new Hono()

// 2b. Middleware: a checkpoint that runs on every request before it
//     reaches our routes. Here it tells the browser "requests from
//     localhost:5173 (our frontend) are allowed to read my responses."
app.use('/*', cors())

// 3. Define our first route:
//    "When a GET request hits '/', run this function and reply with text."
app.get('/', (c) => {
  return c.text('memorandum backend is alive')
})

// 4. Actually start listening for requests, on port 3000.
serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`Server running at http://localhost:${info.port}`)
})
