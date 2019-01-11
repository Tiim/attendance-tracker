const { knex } = require('../db');

module.exports = {
  async getAll(options) {
    return await knex
      .from('event')
      .select()
      .orderBy('date');
  },

  async get(id) {
    return await knex
      .from('event')
      .select()
      .where({ id });
  },

  async getForTeam(teamId, options) {
    const date = options.date || new Date();

    return await knex
      .from('event')
      .select()
      .where({ teamId: id })
      .where('date', '<', date)
      .orderBy(date, 'desc');
  },

  async insert(date, teamId) {
    const ret = await knex('event')
      .insert({ date, teamId })
      .returning('id');
    return ret[0];
  },
};
