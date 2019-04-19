const { knex } = require('../db');

module.exports = {
  async exists(id) {
    if (!id) {
      return false;
    }
    const ret = await knex
      .from('race-result')
      .select(id)
      .where({ id })
      .limit(1);
    return ret.length > 0;
  },

  async get(id) {
    const [ret] = await knex
      .from('race-result')
      .select()
      .where({ id });
    return ret;
  },

  async getForPerson(id) {
    const ret = await knex
      .from('race-result')
      .select()
      .where({ personId: id });
    return ret;
  },

  async upsert(result) {
    let { id } = result;
    if (await this.exists(id)) {
      await knex('race-result')
        .where({ id })
        .update(result);
    } else {
      [id] = await knex('race-result')
        .insert(result)
        .returning('id');
    }
    return this.get(id);
  },
};
