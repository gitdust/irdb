require('./db/connect');

const log = require('./modules/log');
const http = require('http');
const app = require('./app');

const server = http.createServer(app);

server.listen(app.get('port'));

server.on('error', (err) => {
  log.error(`server start with error:${err.message}.`);
});

server.on('listening', () => {
  log.info(`server start successfully, listening port:${app.get('port')}.`);
});
