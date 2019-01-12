const { knex } = require('../db');

const event = require('./event');
const person = require('./person');

module.exports = {
  async getAll() {
    return await knex
      .from('team')
      .select('id', 'name')
      .orderBy('name');
  },

  async get(id) {
    const teamPromise = knex
      .from('team')
      .select()
      .where({ id });
    const personsPromise = person.getForTeam(id);
    const eventsPromise = event.getForTeam(id);
    const [[team], persons, events] = await Promise.all([
      teamPromise,
      personsPromise,
      eventsPromise,
    ]);
    return {
      ...team,
      persons,
      events,
    };
  },

  async insert(name) {
    const ret = await knex('team')
      .insert({ name })
      .returning('id');
    return ret[0];
  },
};
