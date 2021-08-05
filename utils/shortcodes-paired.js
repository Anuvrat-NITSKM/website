const sass = require('sass');
const path = require("path");

const appendTemplate = function(content, selector){
    return `<template data-append="${selector}">${content}</template>`
}

module.exports = {
    styles: function(content){
        const renderCss = sass.renderSync({data: content, includePaths: [path.resolve(__dirname, '../', 'src', 'assets','styles')]});
        return appendTemplate(renderCss.css.toString(), 'style');
    },
    append: appendTemplate
}
