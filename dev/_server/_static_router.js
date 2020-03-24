// @ts-check
import express from "express";
import memes from "mime-types"; // yes, memes
import { readdirSync } from "fs";
import { join } from "path";
import { compressed } from "./_compressed.js";

/**
 * @param {string} directory
 * @param {null | string | string[]} [extentions]
 */
export function files(directory, extentions = null) {
	const exts = typeof extentions === "string" ? [extentions] : extentions;
	const router = express.Router();
	const _files = readdirSync(directory, { withFileTypes: true })
		.filter(file => file.isFile() && exts ? exts.some(ext => file.name.endsWith(`.${ext}`)) : true);
	/**@type {{ [name: string]: import('express').RequestHandler }} */
	const files = {};
	for (const { name } of _files) {
		files[name] = compressed(join(directory, name), memes.lookup(name) || 'text/raw');
	}
	const $404 = compressed('./dev/_server/_404.html', 'text/html');
	router.get('/:filepath?', (req, res, next) => {
		const path = req.params.filepath;
		const handler = files[path];
		if (handler) {
			handler(req, res, next);
		} else next();
	}, $404);
	return router;
}
