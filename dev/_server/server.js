// @ts-check
const https = require("https");
const mime_types = require("mime-types");
const zlib = require("zlib");
const { readFileSync, createReadStream, access, constants } = require("fs");
const { join } = require("path");
const { URL } = require("url");
const { port, dirs } = require("./config.js");
const { pipeline } = require("stream");
const cwd = process.cwd();
const _404Location = join(cwd, 'dev', '_server', '_404.html');
const _500Location = join(cwd, 'dev', '_server', '_500.html');
https.createServer({
	cert: readFileSync('./dev/_server/cert/cert.pem'),
	key: readFileSync('./dev/_server/cert/cert.key')
}, (request, response) => {
	const url = new URL(request.url, `https://${request.headers.host}`);
	const path = dirs.map(regex => regex.exec(url.pathname)).find(path => path != null);
	if (path) {
		const file = join(cwd, path[0]);
		access(file, constants.R_OK, e => {
			if (e) {
				if (e.code !== 'ENOENT') {
					console.error('\x1b[31m[ERROR]\x1b[0m', `Can't access "${file}" file!`);
					response.writeHead(500, { 'Content-Type': 'text/html' });
					createReadStream(_500Location).pipe(response);
				} else {
					response.writeHead(404, { 'Content-Type': 'text/html' });
					createReadStream(_404Location).pipe(response);
				}
				return;
			}
			response.setHeader('Content-Type', mime_types.lookup(file) || 'text/plain');
			response.setHeader('Vary', 'Accept-Encoding');
			response.setHeader('Cache-Control', 'max-age=31536000');
			const acceptEncoding = request.headers['accept-encoding'].toString();
			const raw = createReadStream(file);
			const onError = err => {
				if (err) {
					if (response.writableLength !== 0 || response.writableEnded) {
						response.end();
						console.error('An error occurred:', err);
					} else {
						console.error('\x1b[31m[ERROR]\x1b[0m', `Can't read "${file}" file!`);
						createReadStream(_500Location).pipe(response);
					}
				}
			};
			if (/\bdeflate\b/.test(acceptEncoding)) {
				response.writeHead(200, { 'Content-Encoding': 'deflate' });
				pipeline(raw, zlib.createDeflate(), response, onError);
			} else if (/\bgzip\b/.test(acceptEncoding)) {
				response.writeHead(200, { 'Content-Encoding': 'gzip' });
				pipeline(raw, zlib.createGzip(), response, onError);
			} else if (/\bbr\b/.test(acceptEncoding)) {
				response.writeHead(200, { 'Content-Encoding': 'br' });
				pipeline(raw, zlib.createBrotliCompress(), response, onError);
			} else {
				response.writeHead(200);
				pipeline(raw, response, onError);
			}
		});
	} else {
		response.writeHead(404, { 'Content-Type': 'text/html' });
		createReadStream(_404Location).pipe(response);
	}
}).listen(port || 8080, () => console.log(`Server has started on https://localhost:${port || 8080}`));
