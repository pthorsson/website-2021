import { Middleware } from 'polka';
import { pages } from '@data-file';

export const get: Middleware = (req, res) => {
  const page = pages.find((p) => p.slug === req.params.slug);

  if (page) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });

    res.end(JSON.stringify(page));
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json',
    });

    res.end(
      JSON.stringify({
        message: `Not found`,
      })
    );
  }
};
