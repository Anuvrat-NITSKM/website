const htmlmin = require('html-minifier')
const jsdom = require("jsdom");

const buildDir = 'dist'

const shouldTransformHTML = (outputPath) =>
    outputPath &&
    outputPath.endsWith('.html') &&
    process.env.ELEVENTY_ENV === 'production'

// const isHomePage = (outputPath) => outputPath === `${buildDir}/index.html`


const appender = (html, outputPath) => {
    if(!outputPath || !outputPath.endsWith('.html'))
        return html
    const dom = new jsdom.JSDOM(html);
    const document = dom.window.document;
    const appendTemplates = document.querySelectorAll('[data-append]');
    appendTemplates.forEach((element) => {
        const selector = element.getAttribute('data-append');

        switch (selector){
            case 'style':
                const styleElem = document.createElement('style')
                styleElem.innerHTML = element.innerHTML
                document.head.appendChild(styleElem)
                break;
            default:
                document.querySelector(selector).innerHTML += element.innerHTML;
        }
        element.parentNode.removeChild(element);
     });

    return dom.serialize()
}



// process.setMaxListeners(Infinity)
module.exports = {
    appender,
    htmlmin: function (content, outputPath) {
        if (shouldTransformHTML(outputPath)) {
            return htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true
            })
        }
        return content
    }
}
