// @ts-check
const https = require("https"),
	mime_types = require("mime-types"),
	zlib = require("zlib"),
	config = require("./config.js"),
	fs = require("fs"),
	pipeline = require("stream").pipeline,
	URL = require("url").URL,
	join = require("path").join,
	_404Location = join(__dirname, '_404.html'),
	_500Location = join(__dirname, '_500.html'),
	root = join(__dirname, '..', '..');
https.createServer({
	cert: fs.readFileSync(join(__dirname, 'cert', 'cert.pem')),
	key: fs.readFileSync(join(__dirname, 'cert', 'cert.key'))
}, (request, response) => {
	var pathname = new URL(request.url, `https://${request.headers.host}`).pathname,
		path = config.dirs.map(regex => regex.exec(pathname)).find(path => path != null);
	if (path) {
		var file = join(root, path[0]);
		fs.access(file, fs.constants.F_OK | fs.constants.R_OK, e => {
			if (e) {
				if (e.code !== 'ENOENT') {
					console.error('\x1b[31m[ERROR]\x1b[0m', `Can't access "${file}" file!`);
					response.writeHead(500, { 'Content-Type': 'text/html' });
					fs.createReadStream(_500Location).pipe(response);
				} else {
					response.writeHead(404, { 'Content-Type': 'text/html' });
					fs.createReadStream(_404Location).pipe(response);
				}
				return;
			}
			response.setHeader('Content-Type', mime_types.lookup(file) || 'text/plain');
			response.setHeader('Vary', 'Accept-Encoding');
			var acceptEncoding = request.headers['accept-encoding'].toString(),
				raw = fs.createReadStream(file),
				onError = err => {
					if (err) {
						if (response.writableLength !== 0 || response.writableEnded) {
							response.end();
							console.error('\x1b[31m[ERROR]\x1b[0m', err);
						} else {
							try {
								fs.createReadStream(_500Location).pipe(response);
							} catch (e) { }
							console.error('\x1b[31m[ERROR]\x1b[0m', `Can't read "${file}" file!`);
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
		fs.createReadStream(_404Location).pipe(response);
	}
}).listen(config.port || 8080, () => console.log(`Server has started on https://localhost:${config.port || 8080}!`));
