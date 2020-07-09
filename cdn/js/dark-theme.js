// @ts-check
((window, document, localStorage, key, _theme_enabled) => {
    var state = localStorage.getItem(key) !== "false";
    var querySelector = document.querySelector.bind(document);
    var classList = querySelector('html').classList;
    var setTheme = (dark, add) => {
        if (dark) {
            text.innerHTML = "Dark" + _theme_enabled;
            list.add('moon');
            list.remove('sun');
            add || classList.add('dark');
        } else {
            text.innerHTML = "Light" + _theme_enabled;
            list.add('sun');
            list.remove('moon');
            classList.remove('dark');
        }
        localStorage.setItem(key, dark);
    }
    var button;
    var list;
    var text;
    if (state) {
        classList.add('dark');
    }
    onload = _ => {
        button = querySelector('.tt');
        list = querySelector('#tt').classList;
        text = querySelector('#bt');
        setTheme(state, true);
        onstorage = (event) => {
            if (event.key === key) {
                setTheme(event.newValue === "true");
            }
        }
        button.onclick = _ => setTheme(state = !state);
    }
})(this, document, localStorage, "dark-theme", " Theme Enabled")