const rootConfig = require('../config');
const config = require('./config');
const knex = require('knex')(config);

const createTableIfNotExists = async (name, callback) => {
  const exists = await knex.schema.hasTable(name);
  if (exists) {
    if (!rootConfig.isTest) console.log(`Table '${name}' exists, skipping`);
  } else {
    if (!rootConfig.isTest) console.log(`Table '${name}' does not exist`);
    await knex.schema.createTable(name, callback);
  }
};

const tables = ['team', 'person', 'event', 'attendance'];

const createTables = async () => {
  // TEAMS
  await createTableIfNotExists('team', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.boolean('active').defaultTo(true);
  });

  //PEOPLE
  await createTableIfNotExists('person', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.integer('teamId');
    table.boolean('active').defaultTo(true);
    table.foreign('teamId').references('team.id');
    table.string('notes').defaultsTo('');
  });

  //TABLES
  await createTableIfNotExists('event', (table) => {
    table.increments('id').primary();
    table.dateTime('date');
    table.integer('teamId');
    table.string('notes').defaultsTo('');
    table.foreign('teamId').references('team.id');
  });

  //ATTENDANCE
  await createTableIfNotExists('attendance', (table) => {
    table.increments('id').primary();
    table.integer('eventId');
    table.integer('personId');
    table.foreign('eventId').references('event.id');
    table.foreign('personId').references('person.id');
    table.enu('state', ['absent', 'present', 'excused']);
    table.unique(['eventId', 'personId']);
  });

  //USER
  await createTableIfNotExists('user', (table) => {
    table.increments('id').primary();
    table.string('email');
    table.string('hash');
    table.unique('email');
  });

  await createTableIfNotExists('session', (table) => {
    table.increments('id').primary();
    table.integer('userId');
    table.string('session');
    table.dateTime('issued');
  });
};

const maxLimit = config.maxLimit;

module.exports = { knex, createTables, tables, maxLimit };
