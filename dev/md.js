module.exports=(a=>b=>b[a](/\<\!\-\-[\s\S]+\-\-\>/g,"")[a](/>([^\n])\n/g,"<blockquote>$1</blockquote>")[a](/<\/blockquote><blockquote>/g,"")[a](/</g,"&lt;")[a](/>/g,"&gt;")[a](/"/g,"&quot;")[a](/!\[([^\[\]]+)\]\(([^\(\)]*)\)/g,"<img src=\"$2\" alt=\"$1\">")[a](/\[([^\[\]]+)\]\(([^\(\)]*)\)/g,"<a href=\"$2\">$1</a>")[a](/\s*###### \s*([^#\n]+)\s*(?: ######)?\s*/g,"<h6>$1</h6>")[a](/\s*##### \s*([^#\n]+)\s*(?: #####)?\s*/g,"<h5>$1</h5>")[a](/\s*#### \s*([^#\n]+)\s*(?: ####)?\s*/g,"<h4>$1</h4>")[a](/\s*### \s*([^#\n]+)\s*(?: ###)?\s*/g,"<h3>$1</h3>")[a](/\s*## \s*([^#\n]+)\s*(?: ##)?\s*/g,"<h2>$1</h2>")[a](/\s*# \s*([^#\n]+)\s*(?: #)?\s*/g,"<h1>$1</h1>")[a](/\n*([^\n]+)\n-+\n/g,"<h2>$1</h2>")[a](/\n*([^\n]+)\n=+\n/g,"<h1>$1</h1>")[a](/\_\_([^*]+)\_\_/g,"<b>$1</b>")[a](/\*\*([^*]+)\*\*/g,"<b>$1</b>")[a](/\*+([^*]+)\*+/g,"<i>$1</i>")[a](/~~+([^~]+)~~+/g,"<s>$1</s>")[a](/\n+/g,"<br>")[a](/<br><br><h/g,"<h"))("replace");