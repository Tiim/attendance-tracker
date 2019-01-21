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

  fastify.put('/', async (req, reply) => {
    const team = req.body;

    if (team.id && (await storage.team.exists(team.id))) {
      await storage.team.update(team.id, team.name);
      reply.code(200);
    } else {
      const rep = await storage.team.insert(team.name);
      reply.code(201).send(rep);
    }
  });
  next();
};
