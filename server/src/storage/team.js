const { knex } = require('../db');

module.exports = {
  async delete(id) {
    await knex('team')
      .where({ id })
      .del();
  },

  async exists(id) {
    const ret = await knex
      .from('team')
      .select()
      .where({ id })
      .limit(1);
    return ret.length > 0;
  },

  async get(id) {
    const team = await knex
      .from('team')
      .select()
      .limit(1)
      .where({ id });
    return team;
  },

  async getAll() {
    return await knex
      .from('team')
      .select()
      .orderBy('team.name');
  },

  async insert({ id, name }) {
    if (this.exists(id)) {
      await knex('team')
        .update({ name })
        .where({ id });
    } else {
      id = await knex('team')
        .insert({ name })
        .returning('id');
    }
    return this.get(id);
  },
};
