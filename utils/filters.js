
module.exports = {
    obfuscate: function (str) {
        const chars = []
        for (var i = str.length - 1; i >= 0; i--) {
            chars.unshift(['&#', str[i].charCodeAt(), ';'].join(''))
        }
        return chars.join('')
    },

    reformatRepoName: function(str){
        return str.replace(/_/g, ' ')
    },

    stringify: function(str){
        return JSON.stringify(str)
    }
}
