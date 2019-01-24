const attendance = require('./attendance');
const event = require('./event');
const person = require('./person');
const team = require('./team');
const mixed = require('./mixed');

module.exports = {
  attendance,
  event,
  person,
  team,
  mixed,
};

/*

Structure:

delete(id);
exists(id);
get(id);
getAll();
upsert(object);

*/
