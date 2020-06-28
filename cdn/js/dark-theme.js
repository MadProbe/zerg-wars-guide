(function (window, document, localStorage, key) {
    var classList = document.documentElement.classList;
    var button = document.querySelector('.theme-toggle');
    var list = document.querySelector('#theme-toggle').classList;
    var text = document.querySelector('#button-text');
    var state = localStorage.getItem(key) !== "false";
    window.onstorage = function (event) {
        if (event.key === key) {
            setTheme(event.newValue === "true");
        }
    }
    function setTheme(dark) {
        if (dark) {
            text.innerHTML = "Dark Theme Enabled"
            list.add('fa-moon-o');
            list.remove('fa-sun-o');
            classList.add('dark');
        } else {
            text.innerHTML = "Light Theme Enabled"
            list.add('fa-sun-o');
            list.remove('fa-moon-o');
            classList.remove('dark');
        }
        localStorage.setItem(key, dark);
    }
    setTheme(state);
    button.onclick = function () {
        setTheme(state = !state);
    }
})(window, document, localStorage, "dark-theme");