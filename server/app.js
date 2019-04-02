const {performShellCommandInNewShell} = require("./libs/utils");
const path = require("path");

class App {
    println(text) {
        console.log(text);
    }

    fetchDataThenAlert(cb) {
        console.log("fetch data...");
        setTimeout(() => {
            console.log("...then alert!");
            cb(JSON.stringify({timestamp: new Date()}));
        }, 1000)
    };

    runShellCommand1(cb) {
        performShellCommandInNewShell(path.join(__dirname, "test.bat"), [], cb)
    }
}

module.exports = App;