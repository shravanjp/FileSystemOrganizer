#!/usr/bin/env node
const process = require("process");
const fs = require("fs");
const path = require("path");
let args = process.argv;
let inputArray = args.slice(2);
let command = inputArray[0];
let helpObject = require("./commands/help");
let treeObject = require("./commands/tree");
let organizeObject = require("./commands/organize");

switch (command) {
    case "tree"     :   treeObject.treeKey(inputArray[1]);
                        break;
    case "organize" :   organizeObject.organizeKey(inputArray[1]);
                        break;
    case "help"     :   helpObject.helpKey();
                        break;
    default         :   console.log("Please 🙏 input the right command");
}

