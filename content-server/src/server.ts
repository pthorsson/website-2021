import * as express from 'express';
import { createServer } from 'http';
import { fetchContent } from './fetch-content';

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

app.post('/webhook/content-update', (req, res, next) => {
  console.log('content update!');

  res.json('OK').status(200);
});

app.get('/get-content', async (req, res, next) => {
  const content = await fetchContent();
  res.json(content);
});

app.use('/*', (req, res) => res.status(400).json('Bad request'));

// Run server
server.listen(PORT, () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('\n**********************************\n');
    console.log(`Server up on http://localhost:${PORT}`);
    console.log('\n**********************************\n');
  }
});
