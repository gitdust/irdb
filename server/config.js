require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const DEBUG = NODE_ENV !== 'production';

const {
  FRONT_PORT,
  END_PORT,
  DB_USER,
  DB_PWD,
  TOKEN,
} = process.env;

const PORT = DEBUG ? END_PORT : FRONT_PORT;


const CORS_ERR = 'Not allowed by CORS';

module.exports = {
  DEBUG,
  CORS_ERR,
  PORT,
  DB_USER,
  DB_PWD,
  TOKEN,
};
