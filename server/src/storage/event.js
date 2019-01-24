const { knex } = require('../db');
const { aggregateQuery } = require('./aggregate');

const aggregate = aggregateQuery('event', 'events');

module.exports = {
  async delete(id) {
    await knex('event')
      .where({ id })
      .del();
  },

  async exists(id) {
    if (!id) {
      return false;
    }
    const ret = await knex
      .from('event')
      .select(id)
      .where({ id })
      .limit(1);
    return ret.length > 0;
  },

  async get(id) {
    const res = await knex
      .from('event')
      .select('event.id', 'event.date', 'event.teamId', knex.raw(aggregate))
      .where({ 'event.id': id })
      .leftJoin('attendance', { 'event.id': 'attendance.eventId' })
      .groupBy('event.id');
    return res[0];
  },

  async getAll() {
    return await knex
      .from('event')
      .select('event.id', 'event.date', 'event.teamId', knex.raw(aggregate))
      .orderBy('date')
      .leftJoin('attendance', { 'event.id': 'attendance.eventId' })
      .groupBy('event.id');
  },

  async upsert({ id, date, teamId }) {
    if (this.exists(id)) {
      await knex('event')
        .where({ id })
        .update({ date, teamId });
    } else {
      id = await knex('event')
        .insert({ date, teamId })
        .returning('id');
    }
    return this.get(id);
  },
};
