module.exports = function(fastify, opts, next) {
  fastify.get('/me', {}, async (req, reply) => {
    reply.send({ user: req.session.user });
  });

  next();
};
