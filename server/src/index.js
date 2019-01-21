//Load config first
require('./config');

const { createTables } = require('./db');

require('./server');

createTables();
