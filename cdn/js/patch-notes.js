fetch('./cdn/md/patch-notes.md')
	.then(res => res.text())
	.then(text => this.querySelector('.content').insertAdjacentHTML('beforeend', LooseMarkdown(text)))