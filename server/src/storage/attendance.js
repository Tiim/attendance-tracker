const { knex } = require('../db');

module.exports = {
  async exists(id) {
    if (!id) {
      return false;
    }
    const ret = await knex
      .from('attendance')
      .select(id)
      .where({ id })
      .limit(1);
    return ret.length > 0;
  },

  async get(id) {
    const ret = await knex
      .from('attendance')
      .select()
      .where({ id });
    return ret[0];
  },

  async upsert({ id, eventId, personId, state }) {
    if (await this.exists(id)) {
      await knex('attendance')
        .where({ id })
        .update({ eventId, personId, state });
    } else {
      [id] = await knex('attendance')
        .insert({ eventId, personId, state })
        .returning('id');
    }
    return this.get(id);
  },
};
