/*********************************************
 * Backend console startup.
 *********************************************/
const BANNER = String.raw`             
 __  __            _            _ ___  
|  \/  |_  _ _ __ | |__  ___ _ | / __| 
| |\/| | || | '  \| '_ \/ _ \ || \__ \ 
|_|  |_|\_,_|_|_|_|_.__/\___/\__/|___/ 
`;
console.log(BANNER);
console.log(`Starting server PID ${process.pid} with args: ${process.argv}`);

const os = require("os");
const path = require('path');
const spawn = require('child_process').spawn;
const libs = require("./libs/libs");
const SocketServer = libs.require('ws').Server;
const express = libs.require('express');
const cookieParser = libs.require('cookie-parser');
const MessageBus = require("./libs/messageBus");
/***********************************************
 * Inject custom code from 'app.js'.
 ***********************************************/
const AppClass = require("./app");

// https://gist.github.com/6174/6062387
// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
const SERVER_KEY = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

// define generic routes.
const app = express();
const APP_ROUTE = "/app";
// resources
app.use(APP_ROUTE, express.static(path.join(__dirname, "../client")));
app.use(cookieParser());

// the root path should only be authorized if the correct server key is given.
// it should redirect and set a cookie so that the url is clean
app.get("/", function (req, res) {
    if (req.query.k === SERVER_KEY) {
        // should be the first request made (/?k={SERVER_KEY})
        // redirect so that the url is clean and does not visually leak the key.
        res.cookie("server_key", SERVER_KEY);
        res.redirect(APP_ROUTE);
    } else if (req.cookies["server_key"] === SERVER_KEY) {
        // if user actually hits "/" again.
        res.redirect(APP_ROUTE);
    } else {
        res.sendStatus(401);
    }
});

// start express server on a random open port
// then open default browser to /?k={SERVER_KEY} route,
// which will redirect to the actual route.
const server = app.listen(0);
server.on("listening", function () {
    const hostname = os.hostname();
    const port = server.address().port;
    const url = `http://${hostname}:${port}?k=${SERVER_KEY}`;
    console.log(`Server started at ${url} on ${new Date()}`);
    spawn("cmd", ["/c", "start", url], {
        detached: true
    })
});

/****************************************************************
 * WebSocket connection.
 * Build WebSocket connection so that frontend can connect
 * to this backend.
 ****************************************************************/
//init WebSocket and handle incoming connect requests
const wss = new SocketServer({server, path: `/ws/${SERVER_KEY}`});
const clients = [];
let shutdownTimer;

function shutDownServerIfNoClients() {
    // need to check if canceled
    if (clients.length === 0) {
        console.log("No Clients connected. Shutting down now.");
        process.exit(0);
    }
}

// the app can have multiple connections.
// the AppClass will have a distinct instance for each front-end instance.
wss.on('connection', function connection(ws, req) {

    console.log("Connected to client at " + req.connection.remoteAddress);
    clients.push(1);

    let messageBus = new MessageBus();
    messageBus.send = message => {
        try {
            ws.send(message);
        } catch (e) {
            console.log(e);
        }
    };

    // connect the application-specific functions
    messageBus.subscriber = new AppClass();

    ws.on('message', function incoming(message) {
        console.log("received message...", message);

        try {
            messageBus.receive(message);
        } catch (e) {
            console.log(e);
        }
    });

    // keep track of connections as they are closed
    // so that we can shut down the server when
    // the only remaining client has been closed.
    ws.on('close', function (code, reason) {
        console.log(`Connection closed with ${req.connection.remoteAddress}. Code: ${code}`);
        clients.pop();

        // if any previously closed connection is counting down, cancel it.
        clearTimeout(shutdownTimer);
        shutdownTimer = setTimeout(shutDownServerIfNoClients, 1000);
    });
});