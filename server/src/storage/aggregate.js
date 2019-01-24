const { knex } = require('../db');

const aggregateQuery = (table, as) => {
  return `coalesce(json_agg(${table}) filter(where ${table}.id is not null), '[]') as ${as}`;
};

module.exports = {
  aggregateQuery,
};
