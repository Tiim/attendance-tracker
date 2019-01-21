/* eslint-disable node/no-unpublished-require */
const chai = require('chai');
const server = require('../src/server').fastify;
const should = chai.should();

module.exports = {
  should,
  server,
  chai,
};
