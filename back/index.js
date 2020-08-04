const app = require('./app');

const http = require('http');

const socketIo = require('socket.io');

const gameControllers = require('./controllers/gameControllers');

app.use(gameControllers);

const allPlayerStorageDB = require('./allPlayerStorageDB');

console.log(allPlayerStorageDB);
//

const config = require('./utils/config');

const logger = require('./utils/logger');

const server = http.createServer(app);

//

const io = socketIo(server);

//Websocket:

let interval;

io.on('connection', (socket) => {
  console.log('New client connected');
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 3000);
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const response = allPlayerStorageDB;
  // Emitting a new message. Will be consumed by the client
  socket.emit('FromAPI', response);
};

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

module.exports = io;
