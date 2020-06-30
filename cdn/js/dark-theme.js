(function (window, document, localStorage, key) {
    var state = localStorage.getItem(key) !== "false";
    var querySelector = document.querySelector.bind(document);
    var classList = querySelector('html').classList;
    var button;
    var list;
    var text;
    if (state) {
        classList.add('dark');
    }
    function setTheme(dark, add) {
        if (dark) {
            text.innerHTML = "Dark Theme Enabled"
            list.add('fa-moon-o');
            list.remove('fa-sun-o');
            add || classList.add('dark');
        } else {
            text.innerHTML = "Light Theme Enabled"
            list.add('fa-sun-o');
            list.remove('fa-moon-o');
            classList.remove('dark');
        }
        localStorage.setItem(key, dark);
    }
    window.onload = function () {
        button = querySelector('.theme-toggle');
        list = querySelector('#theme-toggle').classList;
        text = querySelector('#button-text');
        setTheme(state, true);
        window.onstorage = function (event) {
            if (event.key === key) {
                setTheme(event.newValue === "true");
            }
        }
        button.onclick = function () {
            setTheme(state = !state);
            localStorage.setItem(key, dark);
        }
    }
})(this, document, localStorage, "dark-theme")