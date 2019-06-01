rem this bat essentially launches "node main.js" in a
rem separate, minimized shell.
cmd /c start /MIN "Mumbo App" node %~dp0server/main.js