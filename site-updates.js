document.addEventListener('DOMContentLoaded', function () {
    fetch('Updates.md', {
        'mode': 'same-origin'
    }).then(function (res) {
        return res.text();
    }, function () {
        return "# Version 0.1.0:\nFix top padding from guide name on mobiles.\nAdd Arl1om's terran guide and avatar.\nFixed avatar image size (100x100).\nOther small fixes.";
    }).then(function (str) {
        return str.trim().split(/\n{2,}/g).map(function (text) {
            return text.split(/\n/g);
        });
    }).then(function (texts) {
        var content = document.querySelector('.content');
        for (var _ = 0; _ < texts.length; _++) {
            var lines = texts[_];
            var header = document.createElement('h1');
            header.append(lines[0].replace(/^#\s*/g, ''));
            content.appendChild(header);
            for (var i = 1; i < lines.length; i++) {
                var line = lines[i];
                content.append(line);
                content.appendChild(document.createElement('br'));
            }
        }
    });
});