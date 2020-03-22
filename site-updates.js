document.addEventListener('DOMContentLoaded', /**@this {Document} */ function () {
	fetch('Updates.md', {
		'mode': 'same-origin'
	})
		.then(res => res.text(), function (e) {
			console.log(e);
			return "# Version 0.1.0:\nFix top padding from guide name on mobiles.\nAdd Arl1om's terran guide and avatar.\nFixed avatar image size (100x100).\nOther small fixes.\n\n# Version 0.1.1:\nAdded page for site updates (https://madprobe.github.io/zerg-wars-guide/site-updates.html)\n\n# Version 0.1.2:\nAdded more guides for terran.\n";
		})
		.then(str => str.trim().split(/\n{2,}/g).map(text => text.split(/\n/g)))
		.then(texts => {
			const content = this.querySelector('.content');
			for (let _ = 0; _ < texts.length; _++) {
				const lines = texts[_];
				const header = this.createElement('h1');
				header.append(lines[0].replace(/^#\s*/g, ''));
				content.appendChild(header);
				for (let i = 1; i < lines.length; i++) {
					content.append(lines[i]);
					content.appendChild(this.createElement('br'));
				}
			}
		});
});