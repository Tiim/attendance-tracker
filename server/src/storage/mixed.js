const { knex, maxLimit } = require('../db');
const person = require('./person');

const { aggregateQuery } = require('./aggregate');

const attendanceAggregate = aggregateQuery('attendance', 'attendances');

module.exports = {
  async eventForPerson(personId, options) {
    const { teamId } = await person.get(personId);
    return this.eventForTeam(teamId, options);
  },

  async eventForTeam(teamId, options) {
    let {
      pagination: { limit = maxLimit, before = new Date() },
    } = options;
    before = new Date(before);

    return await knex
      .from('event')
      .select(
        'event.id',
        'event.date',
        'event.teamId',
        knex.raw(attendanceAggregate)
      )
      .where({ 'event.teamId': teamId })
      .where('event.date', '<=', before)
      .leftJoin('attendance', { 'event.id': 'attendance.eventId' })
      .groupBy('event.id')
      .orderBy('event.date', 'desc')
      .limit(limit);
  },

  async personForTeam(teamId) {
    return await knex
      .from('person')
      .select()
      .where({ teamId, active: true });
  },
};
