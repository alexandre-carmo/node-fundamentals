import http from 'node:http'
import { json } from './middlewares/json.js';

// fake database
const users = [];

const server = http.createServer(async (req, res) => {
	const { method, url } = req;

	// load json req
	await json(req, res)

	if (method === 'GET' && url === '/users') {
		return res
			.end(JSON.stringify(users));
	}

	if (method === 'POST' && url === '/users') {
		users.push({
			id: 1,
			name: 'John Doe',
			email: 'johndoe@example.com'
		})

		return res.writeHead(201).end();
	}

	return res.writeHead(404).end('Not Found');
})

server.listen(3333)