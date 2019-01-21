const storage = require('../storage');

module.exports = function(fastify, opts, next) {
  fastify.get('/', async (req, reply) => {
    const result = await storage.person.getAll();
    reply.send(result);
  });
  fastify.get('/:id', async (req, reply) => {
    const { id } = req.params;
    const result = await storage.person.get(id);
    reply.send(result);
  });

  fastify.put('/', async (req, reply) => {
    const person = req.body;

    if (person.id && (await storage.person.exists(person.id))) {
      await storage.person.update(person.id, person.name, person.teamId);
      reply.code(200).send();
    } else {
      const rep = await storage.person.insert(person.name, person.teamId);
      reply.code(201).send(rep);
    }
  });
  fastify.delete('/:id', async (req, reply) => {
    const { id } = req.params;
    await storage.person.delete(id);
    reply.status(200).send();
  });
  next();
};
