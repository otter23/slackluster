const app = require('../app');
const { origin } = require('../config');
// const { environment } = require('../config');

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');

//initialize a new instance of socket.io by passing the server (the HTTP server) object.
//https://socket.io/get-started/chat
//https://socket.io/docs/v4/using-multiple-nodes/
//enable CORS - https://socket.io/docs/v3/handling-cors/
// Test: curl "http://localhost:5000/socket.io/?EIO=4&transport=polling"
const io = new Server(server, {
  cors: {
    origin: origin,
    // origin: environment === 'development' ? '*' : origin
    methods: ['GET', 'POST'],
  },
});

// add socket-IO to app's global space as key value pair for api route use
app.set('socketio', io);

const { registerChannelHandlers } = require('./channelRoutes');

const onConnection = (socket) => {
  // add socket to app global space as key value pair
  app.set('socket', socket);

  //listen on the connection event for incoming sockets and log it to the console.
  console.log('a user connected');

  registerChannelHandlers(io, socket);

  //upon first connect, emit to the user who connected:
  socket.emit('welcome', 'Welcome to Slackluster!');
  socket.emit('chat', { msg: 'Welcome to Slackluster!' });

  //upon first connect, broadcast to everyone but user who connected:
  socket.broadcast.emit('chat', { msg: 'A user has joined the chat' });

  //upon first connect, broadcasts to all clients:
  // io.emit('chat', { msg: 'Now its a party' });

  //Listens for incoming 'chat' events:
  socket.on('chat', (data) => {
    //Broadcasts to all users including the originator of the event:
    io.emit('chat', data);

    //Broadcast to everyone but the originator of the event:
    // socket.broadcast.emit('chat', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('chat', { msg: 'A user has left the chat' });
  });
};

//Emitting from API routes
//https://stackoverflow.com/questions/53238655/how-to-socket-broadcast-emit-within-an-express-route-handler
//stackoverflow.com/questions/18856190/use-socket-io-inside-a-express-routes-file/31277123#31277123

module.exports = { server, io, onConnection };
