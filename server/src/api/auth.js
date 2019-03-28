const storage = require('../storage');

module.exports = function(fastify, opts, next) {
  fastify.post(
    '/login',
    {
      schema: {
        body: 'login#',
      },
    },
    async (req, reply) => {
      const { email, password } = req.body;
      const success = await storage.auth.check(email, password);
      if (success) {
        req.session.user = success;
        reply.status(200).send(success);
      } else {
        reply.status(403).send();
      }
    }
  );

  fastify.post(
    '/register',
    {
      schema: {
        body: 'login#',
      },
    },
    async (req, reply) => {
      const { email, password } = req.body;
      const user = await storage.auth.register(email, password);
      req.session.user = user;
      reply.status(201).send(user);
    }
  );

  fastify.get('/me', {}, async (req, reply) => {
    reply.send({ user: req.session.user });
  });

  next();
};
