const app = require('./app');
const { origin } = require('./config');

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
//initialize a new instance of socket.io by passing the server (the HTTP server) object.
//enable CORS - https://socket.io/docs/v3/handling-cors/
// Test: curl "http://localhost:5000/socket.io/?EIO=4&transport=polling"
const io = new Server(server, {
  // cors: {
  //   origin: origin,
  //   methods: ['GET', 'POST'],
  // },
});

module.exports = { server, io };
