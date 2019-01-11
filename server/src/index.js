const { knex, createTables } = require('./db');
const { startServer } = require('./server');

createTables().then(() => startServer());
