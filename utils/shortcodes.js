const MarkdownIt = require("markdown-it");

module.exports = {
    icon: function (name) {
        return `<svg class="icon icon--${name}" role="img" aria-hidden="true" width="24" height="24">
                    <use xlink:href="#icon-${name}"></use>
                </svg>`
    },

    renderAndResolveMD: function (rawString, repoName){
        const mdRender = new MarkdownIt();
        const html = mdRender.render(rawString);
        return html.replace(/(src|href)="[./](.*?)"/gi, function (m, $1, $2) {
            return `${$1}="https://github.com/${process.env.ORG_NAME}/${repoName}/raw/${process.env.DEFAULT_BRANCH}${$2}"`
            })
    },

}
