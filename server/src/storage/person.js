const { knex } = require('../db');

module.exports = {
  async deactivate(id) {
    await knex('person')
      .where({ id })
      .update({ active: false });
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
    const [person] = await knex
      .from('person')
      .select()
      .where({ id });
    return person;
  },

  async getAll() {
    return await knex
      .from('person')
      .select()
      .where({ active: true })
      .orderBy('name');
  },

  async search(name) {
    name = name.toLowerCase();
    return await knex
      .from('person')
      .select()
      .whereRaw(`LOWER(name) LIKE ?`, [`%${name}%`])
      .orderBy('name');
  },

  async upsert({ id, name, teamId, active = true }) {
    if (await this.exists(id)) {
      await knex('event')
        .where({ id })
        .update({ name, teamId, active });
    } else {
      [id] = await knex('person')
        .insert({ name, teamId })
        .returning('id');
    }
    return this.get(id);
  },
};
