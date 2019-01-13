const { knex } = require('../db');

module.exports = {
  async getSingle(id) {
    const ret = await knex
      .from('attendance')
      .select()
      .where({ id });
    return ret[0];
  },
  async insert(eventId, personId, state) {
    const ret = await knex('attendance')
      .insert({ eventId, personId, state })
      .returning('id');
    return ret[0];
  },
  async update(id, eventId, personId, state) {
    await knex('attendance')
      .where({ id })
      .update({
        eventId,
        personId,
        state,
      });
    return id;
  },
};
