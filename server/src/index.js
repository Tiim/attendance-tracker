//Load config first
require('./config');

const { createTables } = require('./db');
const { startServer } = require('./server');

createTables().then(() => startServer());
