const config = require('../config');
const log = require('../modules/log');
const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;

let CONNECT_STRING = 'mongodb://';
if (config.DEBUG) {
  CONNECT_STRING += '127.0.0.1:27017/irdb';
} else {
  CONNECT_STRING += `${config.DB_USER}:${config.DB_PWD}@127.0.0.1:27017/irdb`;
}
// log(CONNECT_STRING);
mongoose.connect(CONNECT_STRING);

const db = mongoose.connection;
db.on('error', (err) => {
  log.info(`mongodb connect with error:${err.message}.`);
});
db.once('open', () => {
  log.info('mongodb connect successfully.');
});
