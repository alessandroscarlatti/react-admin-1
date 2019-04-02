class WebSocketApp {
    set server(server) {
        this._server = server;
    }

    get server() {
        return this._server;
    }

    /**
     * These are the front end application functions.
     */
    println() {
        this._server.println("stuff");
    }

    fetchDataThenAlert() {
        this._server.fetchDataThenAlert((data) => {
            alert("Received data: " + data);
        });
    }

    runShellCommand1() {
        this._server.runShellCommand1({
            started: function () {
                console.log("started.");
            },

            stdout: function (text) {
                console.log("STDOUT", text);
            },

            completed: function () {
                console.log("Test bat complete!");
                alert("Test bat complete!");
            },

            failed: function () {
                console.log("Test bat failed.");
                alert("Test bat failed!");
            }
        });
    }
}

class App extends React.Component {
    render() {
        return (
            <div className="">
                <h1 className="jumbotron text-center">Hello world</h1>
                <div className="text-center">
                    <button className="btn btn-primary test-button" onClick={app.println.bind(app)}>Println to server console</button>
                    <button className="btn btn-warning test-button" onClick={app.fetchDataThenAlert.bind(app)}>Fetch data on server, then alert me</button>
                    <button className="btn btn-danger test-button" onClick={app.runShellCommand1.bind(app)}>Run test bat on server</button>
                </div>
                <Greeting/>
            </div>
        );
    }
}

class Greeting extends React.Component {
    render() {
        return (
            <div className="text-center">Hello! Welcome to a test page for a lightweight frontend application.</div>
        )
    }
}