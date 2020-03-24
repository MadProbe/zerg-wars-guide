fetch('./cdn/md/updates.md')
	.then(res => res.text(), () => "# Version 0.1.0:\nFix top padding from guide name on mobiles.\nAdd Arl1om's terran guide and avatar.\nFixed avatar image size (100x100).\nOther small fixes.\n\n# Version 0.1.1:\nAdded page for site updates (https://madprobe.github.io/zerg-wars-guide/site-updates.html)\n\n# Version 0.1.2:\nAdded more guides for terran.\n")
	.then(str => document.querySelector('.content').insertAdjacentHTML('beforeend', LooseMarkdown(str.trim())));
