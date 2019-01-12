const { knex } = require('../db');

const common = require('./common');

module.exports = {
  async getAll(options) {
    return await knex
      .from('person')
      .select()
      .orderBy('id');
  },

  async get(id) {
    const [person] = await knex
      .from('person')
      .select()
      .where({ id });
    if (!person) {
      return null;
    }
    const eventsPromise = common.event.getForTeamAndPerson(person.teamId, id);
    const teamsPromise = common.team.getNoDeps(person.teamId);
    const [teamObj, events] = await Promise.all([teamsPromise, eventsPromise]);
    return {
      ...person,
      events,
      team: teamObj,
    };
  },

  async insert(name, teamId) {
    const ret = await knex('person')
      .insert({ name, teamId })
      .returning('id');
    return ret[0];
  },
};
