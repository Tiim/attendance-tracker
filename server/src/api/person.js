const storage = require('../storage');

module.exports = function(fastify, opts, next) {
  fastify.get('/', async (req, reply) => {
    const result = await storage.person.getAll();
    reply.send(result);
  });

  fastify.put('/', async (req, reply) => {
    const res = await storage.person.upsert(req.body);
    reply.send(res);
  });

  fastify.get('/:personId', async (req, reply) => {
    const { personId } = req.params;
    const result = await storage.person.get(personId);
    reply.send(result);
  });

  fastify.delete('/:personId', async (req, reply) => {
    const { personId } = req.params;
    await storage.person.delete(personId);
    reply.send();
  });

  fastify.get('/:personId/events', async (req, reply) => {
    const { personId } = req.params;
    const events = await storage.mixed.eventForPerson(personId);
    reply.send(events);
  });

  next();
};
