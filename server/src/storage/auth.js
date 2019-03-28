const bcrypt = require('bcrypt');
const { knex } = require('../db');

module.exports = {
  async register(email, password) {
    const hash = await bcrypt.hash(password, 10);

    const [id] = await knex('user')
      .insert({ email, hash })
      .returning('id');

    const user = await this.get(id);
    delete user.hash;
    return user;
  },

  async check(email, password) {
    const user = await this.getForUsername(email);
    if (!user) {
      return false;
    }
    const cmp = await bcrypt.compare(password, user.hash);
    if (cmp) {
      delete user.hash;
      return user;
    } else {
      return false;
    }
  },

  async getForUsername(email) {
    //TODO: set indexig in knex
    const [user] = await knex
      .from('user')
      .select()
      .limit(1)
      .where({ email });
    return user;
  },

  async get(id) {
    const [user] = await knex
      .from('user')
      .select()
      .limit(1)
      .where({ id });
    return user;
  },
};
