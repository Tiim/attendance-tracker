const { knex } = require('../db');
const common = require('./common');

module.exports = {
  async getAll() {
    return await knex
      .from('event')
      .select(
        'event.id',
        'event.date',
        'event.teamId',
        knex.raw(common.event.aggreagte)
      )
      .orderBy('date')
      .leftJoin('attendance', { 'event.id': 'attendance.eventId' })
      .groupBy('event.id');
  },

  async get(id) {
    const res = await knex
      .from('event')
      .select(
        'event.id',
        'event.date',
        'event.teamId',
        knex.raw(common.event.aggreagte)
      )
      .where({ 'event.id': id })
      .leftJoin('attendance', { 'event.id': 'attendance.eventId' })
      .groupBy('event.id');
    return res[0];
  },

  async insert(date, teamId) {
    const ret = await knex('event')
      .insert({ date, teamId })
      .returning('id');
    return this.get(ret[0]);
  },
};
