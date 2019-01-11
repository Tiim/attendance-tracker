const storage = require('../storage');

module.exports = function(fastify, opts, next) {
  fastify.get('/', async (req, reply) => {
    const result = await storage.team.getAll();
    reply.send(result);
  });
  fastify.get('/:id', async (req, reply) => {
    const { id } = req.params;
    const result = await storage.team.get(id);
    reply.send(result);
  });
  next();
};
