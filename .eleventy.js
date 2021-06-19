require('dotenv-flow').config()
const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginNavigation = require('@11ty/eleventy-navigation')
const markdownIt = require('markdown-it')
const filters = require('./utils/filters.js')
const transforms = require('./utils/transforms.js')
const shortcodes = require('./utils/shortcodes.js')
const pairedShortcodes = require('./utils/shortcodes-paired.js')
const imageShortcode = require('./utils/image.js')
// const iconsprite = require('./utils/iconsprite.js')
const pluginDate = require("eleventy-plugin-date");

module.exports = function (config) {
    // Plugins
    console.log("Loading Plugins....")
    config.addPlugin(pluginRss)
    config.addPlugin(pluginNavigation)
    config.addPlugin(pluginDate);


    // Filters
    console.log("Loading Filters....")
    Object.keys(filters).forEach((filterName) => {
        config.addFilter(filterName, filters[filterName])
    })

    // Transforms
    console.log("Loading Transforms....")
    Object.keys(transforms).forEach((transformName) => {
        config.addTransform(transformName, transforms[transformName])
    })

    // Shortcodes
    console.log("Loading Shortcodes....")
    Object.keys(shortcodes).forEach((shortcodeName) => {
        config.addShortcode(shortcodeName, shortcodes[shortcodeName])
    })

    // Paired Shortcodes
    console.log("Loading Paired Shortcodes....")
    Object.keys(pairedShortcodes).forEach((shortcodeName) => {
        config.addPairedShortcode(shortcodeName, pairedShortcodes[shortcodeName])
    })

    // Icon Sprite
    // console.log("Loading Icon Sprite....")
    // config.addNunjucksAsyncShortcode('iconsprite', iconsprite)

    // Eleventy Img
    // console.log("Loading Eleventy Img....")
    // config.addNunjucksAsyncShortcode('image', imageShortcode)


    // Asset Watch Targets
    console.log("Adding asset watch target....")
    config.addWatchTarget('./src/assets')

    // Markdown
    config.setLibrary(
        'md',
        markdownIt({
            html: true,
            breaks: true,
            linkify: true,
            typographer: true
        })
    )

    // Layouts
    config.addLayoutAlias('base', 'base.njk')

    // Pass-through files
    // config.addPassthroughCopy('src/robots.txt')
    config.addPassthroughCopy('src/assets/images')
    config.addPassthroughCopy('src/assets/fonts')

    // Deep-Merge
    config.setDataDeepMerge(true)

    // Base Config
    return {
        dir: {
            input: 'src',
            output: 'dist',
            includes: '_includes',
            layouts: '_layouts',
            data: '_data'
        },
        templateFormats: ['njk', 'md', '11ty.js'],
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk'
    }
}
