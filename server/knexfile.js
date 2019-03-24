// Update with your config settings.
const cfg = require('./src/db/config');

module.exports = {
  development: {
    client: cfg.client,
    connection: cfg.connection,
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  staging: {
    client: cfg.client,
    connection: cfg.connection,
    pool: cfg.pool,
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: cfg.client,
    connection: cfg.connection,
    pool: cfg.pool,
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
