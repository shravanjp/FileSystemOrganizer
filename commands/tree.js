const process = require("process");
const fs = require("fs");
const path = require("path");

function treeFunction(directoryPath) {
    if (directoryPath == undefined) {
        directoryPath = process.cwd();
    }
    let doesExist = fs.existsSync(directoryPath);
    if(doesExist) {
        treeHelper(directoryPath, " ");
    }
    else {
        console.log('Please enter the correct Directory Path');
         return;
    }
}

function treeHelper(srcPath,indent) {
    let isFile = fs.lstatSync(srcPath).isFile();
    if (isFile) {
        let fileName = path.basename(srcPath);
        console.log(indent + '|---' + fileName);
    }
    else {
        let dirName = path.basename(srcPath);
        console.log(indent + '|___' + dirName);
        let childNames = fs.readdirSync(srcPath);
        for(let i=0; i < childNames.length; i++) {
            let childPath = path.join(srcPath,childNames[i]);
            treeHelper(childPath, indent+'\t');
        }
    }
}

module.exports = {
    treeKey : treeFunction
}