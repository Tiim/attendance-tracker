const { knex } = require('../db');

const aggregateQuery = (table, as) => {
  return `coalesce(json_agg(${table}) filter(where ${table}.id is not null), '[]') as ${as}`;
};
const aggregateQuerySingle = (table, as) => {
  return `row_to_json(${table}) as ${as}`;
};

const event = {
  aggreagte: aggregateQuery('attendance', 'attendances'),

  async getForTeam(teamId) {
    return await knex
      .from('event')
      .select()
      .where({ teamId })
      .orderBy('date', 'desc');
  },

  async getForTeamAndPerson(teamId, personId) {
    return await knex
      .from('event')
      .select(
        'event.id',
        'event.date',
        'event.teamId',
        knex.raw(aggregateQuerySingle('attendance', 'attendance'))
      )
      .where({ teamId })

      .leftJoin('attendance', {
        'event.id': 'attendance.eventId',
        'attendance.personId': knex.raw(personId),
      });
  },
};

const person = {
  async getForTeam(teamId) {
    return await knex
      .from('person')
      .select()
      .where({ teamId });
  },
};

const team = {
  async getNoDeps(id) {
    const [team] = await knex
      .from('team')
      .select()
      .where({ id });
    return team;
  },
};

module.exports = {
  aggregateQuery,
  event,
  person,
  team,
};
