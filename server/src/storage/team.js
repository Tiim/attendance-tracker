const { knex } = require('../db');

const common = require('./common');

module.exports = {
  async getAll() {
    return await knex
      .from('team')
      .select('team.id', 'team.name', knex.raw(common.team.aggreagte))
      .orderBy('team.name')
      .leftJoin('person', { 'person.teamId': 'team.id' })
      .groupBy('team.id');
  },

  async get(id) {
    const teamPromise = knex
      .from('team')
      .select()
      .limit(1)
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

  async update(id, name) {
    const ret = await knex('team')
      .update({ name })
      .where({ id })
      .returning('id');
    return ret[0];
  },

  async exists(id) {
    const ret = await knex
      .from('team')
      .select()
      .where({ id })
      .limit(1);
    return ret.length > 0;
  },
};
