module.exports = {
    port: 8080,
    dirs: [
        /^\/cdn\/[^_.][^\\\/|<"*?>:]*\/[^_.][^\\\/|<"*?>:]+\.[\w\d]+$/m,
        /^\/[^_.][^\\\/|<"*?>:]+\.html$/m
    ]
};
