//Load config first
const config = require('./config');

const { knex, createTables } = require('./db');
const { startServer } = require('./server');

createTables().then(() => startServer());
