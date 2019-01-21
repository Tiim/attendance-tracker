/* eslint-disable node/no-unpublished-require */
const { knex } = require('../src/db');
const knexCleaner = require('knex-cleaner');
const common = require('./common');

const { createTables } = require('../src/db');

before(async () => {
  await createTables();
});
beforeEach(async () => {
  await knexCleaner.clean(knex);
});
after(() => {
  knex.destroy();
  common.server.close();
});
