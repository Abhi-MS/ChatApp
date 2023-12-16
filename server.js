const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.emit('chat message', { message: 'Welcome to the chat!', origin: 'server', user: 'Server' });
  socket.on('chat message', (data) => {
    console.log('Message received:', data);
    io.emit('chat message', { message: data.message, origin: 'client', user: data.user });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
