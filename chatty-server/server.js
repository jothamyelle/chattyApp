// server.js

const express = require('express');
const SocketServer = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  wss.clients.forEach(function each(client) {
    client.send(wss.clients.size);
  });
  ws.on('message', function incoming(message) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === SocketServer.OPEN) {
        let changeableMessage = JSON.parse(message);
        switch(changeableMessage.type) {
          case "postMessage":
            changeableMessage.type = "incomingMessage";
            break;
          case "postNotification": 
          changeableMessage.type = "incomingNotification";
          break;
        }
        client.send(JSON.stringify(changeableMessage));
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    wss.clients.forEach(function each(client) {
      client.send(wss.clients.size);
    });
  });
});