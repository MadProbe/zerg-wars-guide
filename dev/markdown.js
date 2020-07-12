var LooseMarkdown = (replace => /**@param {string} text*/ text => text // Position of [replace] calls is important
[replace](/\<\!\-\-[\s\S]+\-\-\>/g, '')
// [replace](/&/g, '&amp;')
// [replace](/</g, '&lt;')
// [replace](/>/g, '&gt;') // Escape html tags for safety
// [replace](/"/g, '&quot;') // Escape quotes
[replace](/\n>[ \t]*([^>\n]+)\n/g, '\n<blockquote>$1</blockquote>')
[replace](/<\/blockquote>\s*<blockquote>/g, '')
[replace](/!\[([^\[\]]+)\]\(([^\(\)]*)\)/g, '<img src="$2" alt="$1">') /*(_value, alt, src) => '<img src="' + src + '" alt="' + alt + '">' */
[replace](/\[([^\[\]]+)\]\(([^\(\)]*)\)/g, '<a href="$2">$1</a>') /*(_value, val, href) => '<a href="' + href + '">' + val + '</a>' */
[replace](/\s*###### \s*([^#\n]+)\s*(?: ######)?\s*/g, '<h6>$1</h6>') // h6
[replace](/\s*##### \s*([^#\n]+)\s*(?: #####)?\s*/g, '<h5>$1</h5>') // h5
[replace](/\s*#### \s*([^#\n]+)\s*(?: ####)?\s*/g, '<h4>$1</h4>') // h4
[replace](/\s*### \s*([^#\n]+)\s*(?: ###)?\s*/g, '<h3>$1</h3>') // h3
[replace](/\s*## \s*([^#\n]+)\s*(?: ##)?\s*/g, '<h2>$1</h2>') // h2
[replace](/\s*# \s*([^#\n]+)\s*(?: #)?\s*/g, '<h1>$1</h1>') // h1
[replace](/\n*([^\n]+)\n-+\n/g, '<h2>$1</h2>') // also h2
[replace](/\n*([^\n]+)\n=+\n/g, '<h1>$1</h1>') // also h1
[replace](/\_\_([^*]+)\_\_/g, '<b>$1</b>') // bold
[replace](/\*\*([^*]+)\*\*/g, '<b>$1</b>') // bold
[replace](/\*+([^*]+)\*+/g, '<i>$1</i>') // italic
[replace](/~~+([^~]+)~~+/g, '<s>$1</s>') // stroked
[replace](/\n+/g, '<br>')
[replace](/<br><br><h/g, '<h'))("replace");
module.exports = LooseMarkdown;
///*
//*/

/*

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
> Lol sdadasdadga

sdafgasdgwregre
gar
eg
are
`
*/