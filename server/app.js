const {performShellCommandInNewShell} = require("./libs/utils");
const path = require("path");

class App {
    println(text) {
        console.log(text);
    }

    doSomethingThenAlert(cbObj) {
        console.log("doSomething...");
        setTimeout(() => {
            console.log("...then alert!");
            cbObj.alert("stuff the backend sent");
            cbObj.alert2("stuff the backend sent");
        }, 1000)
    };

    runShellCommand1(cb) {
        performShellCommandInNewShell(path.join(__dirname, "test.bat"), [], cb)
    }
}

module.exports = App;