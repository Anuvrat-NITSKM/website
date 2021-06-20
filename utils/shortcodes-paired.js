var sass = require('sass');

const appendTemplate = function(content, selector){
    return `<template data-append="${selector}">${content}</template>`
}

module.exports = {
    styles: function(content){
        const renderCss = sass.renderSync({data: content});
        return appendTemplate(renderCss.css.toString(), 'style');
    },
    append: appendTemplate
}
