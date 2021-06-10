const fs = require('fs-extra');
const path = require("path")
const filenames = fs.readdirSync(path.resolve(__dirname,"../assets/images/gallery"))

module.exports = filenames
