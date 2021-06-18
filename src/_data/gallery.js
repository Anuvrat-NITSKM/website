const fs = require('fs-extra');
const path = require("path");

const folderNames = fs.readdirSync(path.resolve(__dirname,"../assets/images/gallery"));

const sequence = ['online', 'archives']

let files = new Map();

[...new Set(sequence, folderNames)].forEach((folder) => {
    try{
        if(files.has(folder))
            return
        const fileNames = fs.readdirSync(path.resolve(__dirname,"../assets/images/gallery", folder));
        files.set(folder,fileNames);
    }catch(e){
        console.log(e)
    }
})

module.exports = files
