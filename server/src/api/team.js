const storage = require('../storage');

module.exports = function(fastify, opts, next) {
  fastify.get('/', async (req, reply) => {
    const result = await storage.team.getAll();
    reply.send(result);
  });

  fastify.put('/', async (req, reply) => {
    const rep = await storage.team.upsert(req.body);
    reply.send(rep);
  });

  fastify.delete('/:teamId', async (req, reply) => {
    const { teamId } = req.params;
    await storage.team.delete(teamId);
    reply.status(200).send();
  });

  fastify.get('/:teamId/persons', async (req, reply) => {
    const { teamId } = req.params;
    const persons = await storage.mixed.personForTeam(teamId);
    reply.send(persons);
  });

  fastify.get('/:teamId/events', async (req, reply) => {
    const { teamId } = req.params;
    const events = await storage.mixed.eventForTeam(teamId);
    reply.send(events);
  });

  next();
};
