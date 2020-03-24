fetch('./cdn/md/patch-notes.md')
	.then(res => res.text())
	.then(text => document.querySelector('.content').insertAdjacentHTML('beforeend', LooseMarkdown(text)))