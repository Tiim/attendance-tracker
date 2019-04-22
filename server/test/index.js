const knexCleaner = require('knex-cleaner');
const { db } = require('./common');

const { createTables } = require('../src/db');

before(async () => {
  await createTables();
});
beforeEach(async () => {
  await knexCleaner.clean(db.knex);
});
after(() => {
  db.knex.destroy();
});
