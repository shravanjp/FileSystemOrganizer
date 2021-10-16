const process = require("process");
const fs = require("fs");
const path = require("path");
const types = require("../utility");

function organizeFunction(directoryPath) {
    let destpath;
    if (directoryPath == undefined) {
        directoryPath = process.cwd();
    }
    let doesPathExist = fs.existsSync(directoryPath);
    if (doesPathExist) {
        destpath = path.join(directoryPath, "OrganizesFiles");
        if (fs.existsSync(destpath) == false) {
            fs.mkdirSync(destpath);
        }
    }
    else {
        console.log("Please give the correct Directory path");
        return;
    }
    
    organizeHelper(directoryPath,destpath);
}

function organizeHelper(srcPath,destPath) {
    let childName = fs.readdirSync(srcPath);
    for (let i = 0; i < childName.length; i++) {
        let childAddress = path.join(srcPath, childName[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if (isFile) {
            let category = getCategory(childName[i]);
            copyFiles(childAddress, destPath, category);
        }
    }
}

function copyFiles(srcFilePath, destPath, category) {
    let categoryPath = path.join(destPath,category);
    if (fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let fileDestPath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, fileDestPath);
    fs.unlinkSync(srcFilePath);
}

function getCategory(name) {
    let extn = path.extname(name);
    extn = extn.slice(1);
    for (let type in types) {
        let extTypeArray = types[type];
        for (let i = 0; i < extTypeArray.length; i++) {
            if (extn == extTypeArray[i]) {
                return type;
            }
        }
    }
    return 'others';
}

module.exports = {
    organizeKey : organizeFunction
}