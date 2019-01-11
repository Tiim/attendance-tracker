const hydrate = require('nesthydrationjs')();
const { knex } = require('../db');

module.exports = {
  async getAll(options) {
    return await knex
      .from('team')
      .select('id', 'name')
      .orderBy('name');
  },

  async get(id) {
    const [team] = await knex
      .from('team')
      .select()
      .where({ id });
    const persons = await knex
      .from('person')
      .select()
      .where({ teamId: id });
    const events = await knex
      .from('event')
      .select()
      .where({ teamId: id });
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
