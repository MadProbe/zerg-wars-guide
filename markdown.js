// @ts-check
/**
 * @param {string} text
 */
function LooseMarkdown(text) {
	return text // Position of .replace calls is important
		.replace(/>([^\n])\n/g, '<blockquote>$1</blockquote>')
		.replace(/<\/blockquote><blockquote>/g, '')
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;') // Escape html tags for safety
		.replace(/"/g, '&quot;') // Escape quotes
		.replace(/!\[([^\[\]]+)\]\(([^]*)\)/g, function (_value) { return '<img src="' + arguments[2] + '" alt="' + arguments[1] + '">'; })
		.replace(/\[([^\[\]]+)\]\(([^]*)\)/g, function (_value) { return '<a href="' + arguments[2] + '">' + arguments[1] + '</a>'; })
		.replace(/###### \s*([^#\n]+)\s*(?: ######)?\s*/g, '<h6>$1</h6>\n') // h6
		.replace(/##### \s*([^#\n]+)\s*(?: #####)?\s*/g, '<h5>$1</h5>\n') // h5
		.replace(/#### \s*([^#\n]+)\s*(?: ####)?\s*/g, '<h4>$1</h4>\n') // h4
		.replace(/### \s*([^#\n]+)\s*(?: ###)?\s*/g, '<h3>$1</h3>\n') // h3
		.replace(/## \s*([^#\n]+)\s*(?: ##)?\s*/g, '<h2>$1</h2>\n') // h2
		.replace(/# \s*([^#\n]+)\s*(?: #)?\s*/g, '<h1>$1</h1>\n') // h1
		.replace(/\n?([^\n]+)\n-+\n/g, '\n<h2>$1</h2>\n') // also h2
		.replace(/\n?([^\n]+)\n=+\n/g, '\n<h1>$1</h1>\n') // also h1
		.replace(/\_\_([^*]+)\_\_/g, '<b>$1</b>') // bold
		.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>') // bold
		.replace(/\*+([^*]+)\*+/g, '<i>$1</i>') // italic
		.replace(/~~+([^~]+)~~+/g, '<s>$1</s>') // stroked
		.replace(/\n/g, '<br>')
}
/*
console.log(LooseMarkdown(
	`
# Header 1
Also Header 1
=============
## Header 2
Also Header 2
-------------
### Header 3
#### Header 4
##### Header 5
###### Header 6
*italic*
_underline_
**bold**
~~stroked~~
***bold italic***
[img][https://example.com]
`
))
*/