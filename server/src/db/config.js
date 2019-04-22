const config = require('../config');

const connection = process.env.DATABASE_CONNECTION_URL
  ? process.env.DATABASE_CONNECTION_URL
  : {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
    };

module.exports = {
  client: 'pg',
  version: '11.1',
  connection,
  pool: { min: 0, max: 5 },
  maxLimit: 40,
};
