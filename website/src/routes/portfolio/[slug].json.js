import items from '../../../data/portfolio-items.json';

export function get(req, res, next) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { slug } = req.params;

  const item = items.find((item) => item.slug === slug);

  if (item) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });

    res.end(JSON.stringify(item));
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
}
