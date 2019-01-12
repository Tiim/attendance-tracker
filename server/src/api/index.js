const subjects = [
  { prefix: '/events', f: require('./event') },
  { prefix: '/persons', f: require('./person') },
  { prefix: '/teams', f: require('./team') },
];

module.exports = function(fastify, opts, next) {
  subjects.forEach((s) => fastify.register(s.f, { prefix: s.prefix }));

  fastify.get('/', async (req, reply) => {
    const prefixes = subjects.map((s) => s.prefix);
    reply.send({ apis: prefixes });
  });

  next();
};
