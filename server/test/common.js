/* eslint-disable node/no-unpublished-require */
const chai = require('chai');
const server = require('../src/server').fastify;
const should = chai.should();

const http = {
  get: async (url) => {
    const res = await server.inject({ method: 'GET', url });
    return { ...res, body: JSON.parse(res.payload) };
  },
  put: async (url, payload) => {
    const res = await server.inject({ method: 'PUT', url, payload });
    return { ...res, body: JSON.parse(res.payload) };
  },
  post: async (url, payload) => {
    const res = await server.inject({ method: 'POST', url, payload });
    return { ...res, body: JSON.parse(res.payload) };
  },
  delete: async (url) => {
    const res = await server.inject({ method: 'DELETE', url });
    return res;
  },
};

module.exports = {
  http,
  should,
  server,
  chai,
};
