const { Server } = require('socket.io');
const http = require('http');
const app = require('./app');

const server = http.createServer(app);

const io = new Server(server, { cors: '*' });

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
  console.log('a user connected');
});

module.exports = server;
