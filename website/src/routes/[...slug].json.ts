import pages from '../../data/pages.json';

export function get(req, res, next) {
  const { slug: slugParts } = req.params;

  const slug = `/${slugParts.join('/')}`;
  const page = pages.find((p) => p.slug === slug);

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
}
