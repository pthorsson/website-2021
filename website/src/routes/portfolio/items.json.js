import items from '../../../data/portfolio-items.json';

export function get(req, res, next) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.end(JSON.stringify(items));
}
