import express from "express";
import { createServer } from "https";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { compressed } from "./_compressed.js";
import { files } from "./_static_router.js";
const args = process.argv.filter(arg => !process.execArgv.includes(arg));
const dir = process.cwd();
const server = express();
const port = args.find(arg => /--port=\d\d\d\d/gi.test(arg));
server.use('/cdn/css', files(join(dir, 'cdn/css')));
server.use('/cdn/img', files(join(dir, 'cdn/img')));
server.use('/cdn/js', files(join(dir, 'cdn/js')));
server.use('/cdn/md', files(join(dir, 'cdn/md')));
readdirSync(dir, { 'withFileTypes': true }).forEach(file => {
    if (file.isFile() && file.name.endsWith('.html')) {
        const name = join(dir, file.name)
        server.get('/' + file.name, compressed(name, 'text/html'))
    }
});
createServer({
    cert: readFileSync('./dev/_server/cert/cert.pem'),
    key: readFileSync('./dev/_server/cert/cert.key')
}, server).listen(port ? port.match(/\d\d\d\d/)[0] : 8080, () => console.log('Ready!'));
