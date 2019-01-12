const { knex } = require('../db');

const common = require('./common');

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
    const personsPromise = common.person.getForTeam(id);
    const eventsPromise = common.event.getForTeam(id);
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
