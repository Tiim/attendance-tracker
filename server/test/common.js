const chai = require('chai');
const should = chai.should();
const db = require('../src/db');
const storage = require('../src/storage');

module.exports = {
  storage,
  db,
  should,
  chai,
};
