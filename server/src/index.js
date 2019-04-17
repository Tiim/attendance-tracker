//Load config first
require('./config');

const { createTables } = require('./db');

createTables();

require('./server');
