function helpFunction() {
    console.log(`List of All commands
                    node main.js tree "directory path"
                    node main.js orgaanize "directory path"
                    node main.js help`);
}

module.exports = {
    helpKey : helpFunction
}