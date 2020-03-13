document.addEventListener('DOMContentLoaded', () => fetch('Updates.md')
    .catch(() => `# Version 0.1.0:
        Fix top padding from guide name on mobiles.
        Add Arl1om's terran guide and avatar.
        Fixed avatar image size (100x100).
        Other small fixes.
    `.replace(/\n\s+/g, '\n').trim())
    .then(res => typeof res === "string" ? res : res.text())
    .then(str => str.trim().split(/\n{2,}/g).map(text => text.split(/\n/g)))
    .then(texts => {
        const content = document.querySelector('.content');
        for (const lines of texts) {
            const header = document.createElement('h1');
            header.append(lines[0].replace(/^#\s*/g, ''));
            content.appendChild(header);
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i];
                const text = document.createTextNode(line);
                content.appendChild(text);
                content.appendChild(document.createElement('br'));
            }
        }
    }));
