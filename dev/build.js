const { exec } = require('child_process');
const { join, extname } = require("path");
const { readFileSync, writeFileSync } = require("fs");
const { minify } = require("csso");
const { minify: htmlMinify } = require("html-minifier");
const LooseMarkdown = require('./markdown.js');
const { transformSync } = require('@babel/core');
const $cache = new Map;
const $jsminCache = new Map;
const cwd = join(__dirname, '..');
const toBuildDir = join(__dirname, '_to_build');
const cssMinifyOptions = {
    restructure: true,
    debug: true,
    forceMediaMerge: true,
    comments: false,
};
const htmlMinifyOptions = {
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    decodeEntities: true,
    minifyCSS: true,
    minifyJS: { ie8: true },
    minifyURLs: true,
    sortAttributes: true,
    sortClassName: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    removeTagWhitespace: true
};
console.log('Building site-updates.html');
buildHTML(join(toBuildDir, 'site-updates.html'), join(cwd, 'site-updates.html'));
console.log('Building patch-notes.html');
buildHTML(join(toBuildDir, 'patch-notes.html'), join(cwd, 'patch-notes.html'));
console.log('Building taldarim.html');
buildHTML(join(toBuildDir, 'taldarim.html'), join(cwd, 'taldarim.html'), join(cwd, 'index.html'));
console.log('Building terran.html');
buildHTML(join(toBuildDir, 'terran.html'), join(cwd, 'terran.html'));
console.log('Building guide.html');
buildHTML(join(toBuildDir, 'guide.html'), join(cwd, 'guide.html'));
console.log(`Started building css files...`);
exec('npm run css-build', { cwd }, error => {
    console.log(`Building bulma...`);
    if (error) {
        console.error(`An error occurred while building bulma files:\n`, error);
    } else {
        console.log('Minifing code...');
        const bulmaCSSCode = readFileSync(join(cwd, 'cdn', 'css', '_bulma.css'), 'utf-8');
        const minifiedBulmaCSSCode = minify(bulmaCSSCode, cssMinifyOptions).css;
        writeFileSync(join(cwd, 'cdn', 'css', '_bulma.min.css'), minifiedBulmaCSSCode);
        const darkThemeCSSCode = readFileSync(join(cwd, 'cdn', 'css', 'dark-theme.css'), 'utf-8');
        const minifiedDarkThemeCSSCode = minify(darkThemeCSSCode, cssMinifyOptions).css;
        writeFileSync(join(cwd, 'cdn', 'css', 'dark-theme.min.css'), minifiedDarkThemeCSSCode);
        const cssCode = readFileSync(join(cwd, 'cdn', 'css', 'style.css'), 'utf-8');
        const minifiedCSSCode = minify(minifiedBulmaCSSCode + cssCode + minifiedDarkThemeCSSCode, cssMinifyOptions).css;
        writeFileSync(join(cwd, 'cdn', 'css', 'merged.min.css'), minifiedCSSCode);
    }
});
function transformHMTL(code) {
    return code.replace(/<include\s+src\s*=\s*"(.+)"(\s+(?:\w+(?:\s*=\s*"([^>"]+)")?))*>\s*<\/include>/g, (_, path, attrs) => {
        path = join(cwd, path);
        let read = $cache.get(path);
        if (!read) {
            $cache.set(path, read = readFileSync(path, 'utf8'));
            $jsminCache.delete(path);
        }
        switch (extname(path).slice(1)) {
            case "md":
                return LooseMarkdown(read);

            case "html":
                return transformHMTL(read);

            case "mjs":
            case "js":
                var min = $jsminCache.get(path);
                if (!min) {
                    $jsminCache.set(path, min = transformSync(read, {
                        presets: [['minify', {
                            builtIns: false
                        }]],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }).code);
                }
                return `<script${attrs ? (attrs.startsWith(' ') ? attrs : (' ' + attrs)) : ''}>${min}</script>`

            default:
                return read;
        }
    })
}
function buildHTML(file, ...dists) {
    const code = transformHMTL(readFileSync(file, 'utf8'));
    const minified = htmlMinify(code, htmlMinifyOptions);
    for (let index = 0, length = dists.length; index < length; index++) {
        writeFileSync(dists[index], minified, { encoding: 'utf8' });
    }
}
