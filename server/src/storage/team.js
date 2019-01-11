const { knex } = require('../db');

const event = require('./event');

module.exports = {
  async getAll(options) {
    return await knex
      .from('team')
      .select('id', 'name')
      .orderBy('name');
  },

  async get(id, options) {
    const [team] = await knex
      .from('team')
      .select()
      .where({ id });
    const persons = await knex
      .from('person')
      .select()
      .where({ teamId: id });
    const events = await event.getForTeam(team.id, {
      date: options.date,
    });
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
