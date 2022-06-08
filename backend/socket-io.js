const app = require('./app');
const { origin } = require('./config');
const { environment } = require('./config');

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
//initialize a new instance of socket.io by passing the server (the HTTP server) object.
//https://socket.io/get-started/chat
//enable CORS - https://socket.io/docs/v3/handling-cors/
// Test: curl "http://localhost:5000/socket.io/?EIO=4&transport=polling"
const io = new Server(server, {
  cors: {
    origin: origin,
    // origin: environment === 'development' ? '*' : origin
    methods: ['GET', 'POST'],
  },
});

//https://stackoverflow.com/questions/53238655/how-to-socket-broadcast-emit-within-an-express-route-handler
//define a bunch of functions for emmitters that are evoked in the route?

module.exports = { server, io };
