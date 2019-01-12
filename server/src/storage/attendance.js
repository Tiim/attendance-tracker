const { knex } = require('../db');

module.exports = {
  async insert(eventId, personId, state) {
    const ret = await knex('attendance')
      .insert({ eventId, personId, state })
      .returning('id');
    return ret[0];
  },
};
