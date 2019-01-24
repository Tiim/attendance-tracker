const storage = require('../storage');

module.exports = function(fastify, opts, next) {
  fastify.get('/', async (req, reply) => {
    const result = await storage.team.getAll();
    reply.send(result);
  });

  fastify.put('/', async (req, reply) => {
    const team = req.body;

    if (team.id && (await storage.team.exists(team.id))) {
      const rep = await storage.team.update(team.id, team.name);
      reply.code(200).send(rep);
    } else {
      const rep = await storage.team.insert(team.name);
      reply.code(201).send(rep);
    }
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
