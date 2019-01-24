const { knex } = require('../db');
const person = require('./person');

const { aggregateQuery } = require('./aggregate');

const attendanceAggregate = aggregateQuery('attendance', 'attendances');

module.exports = {
  async eventForPerson(personId) {
    const { teamId } = await person.get(personId);
    return this.eventForTeam(teamId);
  },

  async eventForTeam(teamId) {
    return await knex
      .from('event')
      .select(
        'event.id',
        'event.date',
        'event.teamId',
        knex.raw(attendanceAggregate)
      )
      .where({ 'event.teamId': teamId })
      .leftJoin('attendance', { 'event.id': 'attendance.eventId' })
      .groupBy('event.id');
  },

  async personForTeam(teamId) {
    return await knex
      .from('person')
      .select()
      .where({ teamId });
  },
};
