import * as express from 'express';
import * as fs from 'fs';
import { createServer } from 'http';
import { fetchContent } from './fetch-content';
import { DATA_FILE } from './config';
import { getCacheItem, setCacheItem } from './lib/cache';

const app = express();
const server = createServer(app);

const PORT = process.env.CONTENT_SERVER_PORT;
const TOKEN = process.env.CONTENT_SERVER_TOKEN;

// Validate access token
app.use((req, res, next) => {
  if (req.header('X-Access-Token') === TOKEN) {
    next();
  } else {
    res.status(400).json('Bad request');
  }
});

if (process.env.NODE_ENV === 'development') {
  app.post('/webhook/dev-content-update', async (req, res, next) => {
    const content = await fetchContent();

    setCacheItem('content', content);

    fs.writeFileSync(DATA_FILE, JSON.stringify(content, null, 2));

    res.json('OK').status(200);
  });
}

app.post('/webhook/content-update', async (req, res, next) => {
  const content = await fetchContent();

  setCacheItem('content', content);

  res.json('OK').status(200);
});

app.get('/get-content', async (req, res, next) => {
  const content = getCacheItem('content');

  res.json(content);
});

app.use('/*', (req, res) => res.status(400).json('Bad request'));

// Run server
server.listen(PORT, async () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('\n**********************************\n');
    console.log(`Server up on http://localhost:${PORT}`);
    console.log('\n**********************************\n');
  }

  const content = await fetchContent();
  setCacheItem('content', content);
});
