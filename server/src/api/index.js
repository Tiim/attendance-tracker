const authMiddleware = require('./middleware/auth');

const subjects = [
  { prefix: '/auth', f: require('./auth'), auth: false },
  { prefix: '/user', f: require('./user'), auth: true },
  { prefix: '/events', f: require('./event'), auth: true },
  { prefix: '/persons', f: require('./person'), auth: true },
  { prefix: '/teams', f: require('./team'), auth: true },
];

module.exports = function(fastify, opts, next) {
  const authenticated = subjects.filter((s) => s.auth === true);
  fastify.register((fastify, opts, next) => {
    fastify.addHook('preHandler', authMiddleware);
    authenticated.forEach((s) => fastify.register(s.f, { prefix: s.prefix }));
    next();
  });

  const open = subjects.filter((s) => s.auth === false);
  fastify.register((fastify, opts, next) => {
    open.forEach((s) => fastify.register(s.f, { prefix: s.prefix }));
    next();
  });

  fastify.get('/', async (req, reply) => {
    const prefixes = subjects.map((s) => s.prefix);
    reply.send({ apis: prefixes });
  });

  next();
};
