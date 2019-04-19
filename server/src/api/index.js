const authMiddleware = require('./middleware/auth');

const subjects = [
  { prefix: '/auth', f: require('./auth'), auth: false },
  { prefix: '/user', f: require('./user'), auth: true },
  { prefix: '/events', f: require('./event'), auth: true },
  { prefix: '/persons', f: require('./person'), auth: true },
  { prefix: '/teams', f: require('./team'), auth: true },
  { prefix: '/race-result', f: require('./race-result'), auth: true },
];

module.exports = function(fastify, opts, next) {
  //authenticated routes
  const authenticated = subjects.filter((s) => s.auth === true);
  fastify.register((fastify, opts, next) => {
    fastify.addHook('preHandler', authMiddleware);
    authenticated.forEach((s) => fastify.register(s.f, { prefix: s.prefix }));
    next();
  });

  //unauthenticated routes
  const open = subjects.filter((s) => s.auth === false);
  fastify.register((fastify, opts, next) => {
    open.forEach((s) => fastify.register(s.f, { prefix: s.prefix }));
    next();
  });

  //invalid routes
  subjects
    .filter((s) => ![true, false].includes(s.auth))
    .forEach((s) =>
      console.log(
        `WARNING: ${s.prefix} ignored: auth set incorrectly (${s.auth})`
      )
    );

  fastify.get('/', async (req, reply) => {
    const prefixes = subjects.map((s) => s.prefix);
    reply.send({ apis: prefixes });
  });

  next();
};
