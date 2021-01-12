import page from '../../data/page_index.json';

export function get(req, res, next) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify(page));
}
