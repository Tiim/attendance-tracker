const persons = require('./person');
const teams = require('./team');

module.exports = function(fastify, opts, next) {
  fastify.register(persons, { prefix: '/persons' });
  fastify.register(teams, { prefix: '/teams' });

  fastify.get('/', async (req, reply) => {
    reply.send({});
  });

  next();
};
