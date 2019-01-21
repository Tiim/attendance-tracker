const { knex } = require('../db');

const common = require('./common');

module.exports = {
  async getAll() {
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
    const [id] = await knex('person')
      .insert({ name, teamId })
      .returning('id');
    return this.get(id);
  },

  async exists(id) {
    const ret = await knex
      .from('person')
      .select()
      .where({ id })
      .limit(1);
    return ret.length > 0;
  },

  async update(id, name, teamId) {
    const newId = await knex('team')
      .update({ name, teamId })
      .where({ id })
      .returning('id');
    return this.get(newId);
  },
};
