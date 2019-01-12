const { knex } = require('../db');

module.exports = {
  async getAll(options) {
    return await knex
      .from('person')
      .select()
      .orderBy('name');
  },

  async get(id) {
    const [person] = await knex
      .from('person')
      .select()
      .where({ id });
    const events = await knex
      .from('event')
      .select()
      .where({ teamId: person.teamId });
    const [team] = await knex
      .from('team')
      .select()
      .where({ id: person.teamId });
    return {
      ...person,
      events,
      team,
    };
  },

  async getForTeam(teamId) {
    return await knex
      .from('person')
      .select()
      .where({ teamId });
  },

  async insert(name, teamId) {
    const ret = await knex('person')
      .insert({ name, teamId })
      .returning('id');
    return ret[0];
  },
};
