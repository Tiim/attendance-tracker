const { knex } = require('../db');

const selectAgg = `coalesce(json_agg(attendance) filter (where attendance.id is not null), '[]' ) as attendances`;

module.exports = {
  async getAll(options) {
    return await knex
      .from('event')
      .select('event.id', 'event.date', 'event.teamId', knex.raw(selectAgg))
      .orderBy('date')
      .leftJoin('attendance', { 'event.id': 'attendance.eventId' })
      .groupBy('event.id');
  },

  async get(id) {
    return await knex
      .from('event')
      .select('event.id', 'event.date', 'event.teamId', knex.raw(selectAgg))
      .where({ id })
      .leftJoin('attendance', { 'event.id': 'attendance.eventId' });
  },

  async getForTeam(teamId) {
    return await knex
      .from('event')
      .select()
      .where({ teamId })
      .orderBy('date', 'desc');
  },

  async insert(date, teamId) {
    const ret = await knex('event')
      .insert({ date, teamId })
      .returning('id');
    return ret[0];
  },
};
