// @ts-check
import { pipeline, Readable } from "stream";
import { createReadStream } from "fs";
import zlib from "zlib";

/**
 * @returns {import('express').RequestHandler}
 * @param {string} file
 * @param {string} type
 */
export function compressed(file, type, isFile = true, status = 200) {
    // https://nodejs.org/api/zlib.html#zlib_compressing_http_requests_and_responses
    return (request, response) => {
        response.header('Content-Type', type).header('Vary', 'Accept-Encoding').status(status);
        //if (isFile) response.header('Cache-Control', 'max-age=31536000');
        const raw = isFile ? createReadStream(file) : Readable.from(file);
        const _ = request.headers['accept-encoding'] || '';
        // Store both a compressed and an uncompressed version of the resource.
        const acceptEncoding = typeof _ !== "string" ? _[0] : _;

        /**
         * @param {any} err
         */
        const onError = err => {
            if (err) {
                // If an error occurs, there's not much we can do because
                // the server has already sent the 200 response code and
                // some amount of data has already been sent to the client.
                // The best we can do is terminate the response immediately
                // and log the error.
                try {
                    response.status(500).send("Something bad happend")
                } catch (error) {
                    response.end();
                }
                console.error('An error occurred:', err);
            }
        };
        // Note: This is not a conformant accept-encoding parser.
        // See https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.3
        if (/\bdeflate\b/.test(acceptEncoding))
            pipeline(raw, zlib.createDeflate(), response.header('Content-Encoding', 'deflate'), onError);
        else if (/\bgzip\b/.test(acceptEncoding))
            pipeline(raw, zlib.createGzip(), response.header('Content-Encoding', 'gzip'), onError);
        else if (/\bbr\b/.test(acceptEncoding))
            pipeline(raw, zlib.createBrotliCompress(), response.header('Content-Encoding', 'br'), onError);
        else pipeline(raw, response, onError);
    }
}
