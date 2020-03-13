document.addEventListener('DOMContentLoaded', () => fetch('Updates.md')
    .then(res => res.text())
    .then(str => str.trim().split(/\n{2,}/g).map(text => text.split(/\n/g)))
    .then(texts => {
        const content = document.querySelector('.content');
        const br = document.createElement('br');
        for (const lines of texts) {
            const header = document.createElement('h1');
            header.append(lines[0]);
            content.appendChild(header);
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i];
                const text = document.createTextNode(line);
                content.appendChild(text);
                content.appendChild(br);
            }
        }
    }));
