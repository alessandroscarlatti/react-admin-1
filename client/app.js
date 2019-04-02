class WebSocketApp {
	set server(server) {
		this._server = server;
	}
	
	get server() {
		return this._server;
	}

	doSomething() {
		alert("Autoalert");
	}

	/**
	 * These are the front end application functions.
	 */
	println() {
		this._server.println("stuff");
	}

	doSomethingThenAlert() {
		this._server.doSomethingThenAlert({
			alert: (text) => {
				alert(text);
			},
			alert2: (text) => {
				alert("alert2:" + text);
			}
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
				console.log("completed.");
			},

			failed: function () {
				console.log("failed.");
			}
		});
	}
}

class App extends React.Component {
	render() {
		return (
			<div>
				<div>Hello world</div>
				<button className="btn btn-primary" onClick={app.println.bind(app)}>Println!</button>
				<button className="btn btn-primary" onClick={app.doSomethingThenAlert.bind(app)}>Do Something Then Alert!</button>
				<button className="btn btn-primary" onClick={app.runShellCommand1.bind(app)}>Run Bat 1</button>
				<Greeting />
			</div>
		);
	}
}

class Greeting extends React.Component {
	render() {
		return (
			<div>Hello!</div>
		)
	}
}