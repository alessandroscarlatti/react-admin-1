# Mumbo Application

## Purpose

The purpose of this project is to enable an extremely lightweight, but robust frontend application
to be bootstrapped by simply copy/pasting a base project.

This base project already includes all the precompiled dependencies necessary to run the application.

Customization is simple.  All sources, even the HTTP and WebSocket server are completely customizable 
without further compilation because they are written for NodeJS.

## Demo
Double-click `launch.bat` to start the app.

The frontend will launch in the default web browser.  The backend will launch in a minimized shell.

## Structure

There are two components: frontend client and backend server.
The two communicate via HTTP and WebSocket.

Static resources are served via HTTP.

A WebSocket connection is opened between the client and server upon loading the client.
This connection is used to load data from the back end.
An example is built into this demo.

For each project the flow of control is simple:

Code execution begins at `main.js`.

Application-specific code is invoked upon connecting the server and client in `app.js`.