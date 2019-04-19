const auth = require('./auth');
const attendance = require('./attendance');
const event = require('./event');
const person = require('./person');
const raceResult = require('./race-result');
const team = require('./team');
const mixed = require('./mixed');

module.exports = {
  auth,
  attendance,
  event,
  person,
  raceResult,
  team,
  mixed,
};

/*

Structure:

delete(id);
deactivate(id);
exists(id);
get(id);
getAll();
upsert(object);

*/
