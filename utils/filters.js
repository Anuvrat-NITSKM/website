const moment = require("moment");

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
    },

    where: function(arr, key, value){
        return arr.filter((d) => d[key] === value)
    },
    timestampFormat: function (timestamp, format, offset=0){
        // Timezone offset should probably be defined
        return moment(timestamp).utcOffset(offset).format(format)
    }
}
