const config = require('./config');
const knex = require('knex')(config);

const createTableIfNotExists = async (name, callback) => {
  const exists = await knex.schema.hasTable(name);
  if (exists) {
    console.log(`Table '${name}' exists, skipping`);
  } else {
    console.log(`Table '${name}' does not exist`);
    await knex.schema.createTable(name, callback);
  }
};

const tables = ['team', 'person', 'event', 'attendance'];

const createTables = async () => {
  // TEAMS
  await createTableIfNotExists('team', (table) => {
    table.increments('id').primary();
    table.string('name');
  });

  //PEOPLE
  await createTableIfNotExists('person', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.integer('teamId');
    table.foreign('teamId').references('team.id');
  });

  //TABLES
  await createTableIfNotExists('event', (table) => {
    table.increments('id').primary();
    table.dateTime('date');
    table.integer('teamId');
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
};

module.exports = { knex, createTables, tables };
