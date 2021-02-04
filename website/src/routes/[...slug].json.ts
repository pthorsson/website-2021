import { Middleware } from 'polka';
import { pages } from '@data-file';

export const get: Middleware = (req, res) => {
  const slugParts = (req.params.slug as unknown) as Array<string>;

  const path = `/${slugParts.join('/')}`;
  const page = pages.find((p) => p.path === path);

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
