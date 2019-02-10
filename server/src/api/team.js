const storage = require('../storage');

module.exports = function(fastify, opts, next) {
  fastify.get(
    '/',
    {
      schema: {
        response: {
          '2xx': { type: 'array', items: 'team#' },
        },
      },
    },
    async (req, reply) => {
      const result = await storage.team.getAll();
      reply.send(result);
    }
  );

  fastify.put(
    '/',
    {
      schema: {
        body: 'team#',
        response: { '2xx': 'team#' },
      },
    },
    async (req, reply) => {
      const res = await storage.team.upsert(req.body);
      reply.status(201).send(res);
    }
  );

  fastify.delete(
    '/:teamId',
    {
      schema: {
        params: {
          teamId: { type: 'integer' },
        },
      },
    },
    async (req, reply) => {
      const { teamId } = req.params;
      await storage.team.delete(teamId);
      reply.status(204).send();
    }
  );

  fastify.get(
    '/:teamId/persons',
    {
      schema: {
        params: {
          teamId: { type: 'integer' },
        },
        response: {
          '2xx': { type: 'array', items: 'person#' },
        },
      },
    },
    async (req, reply) => {
      const { teamId } = req.params;
      const persons = await storage.mixed.personForTeam(teamId);
      reply.send(persons);
    }
  );

  fastify.get(
    '/:teamId/events',
    {
      schema: {
        params: {
          teamId: { type: 'integer' },
        },
        querystring: {
          limit: { type: 'integer' },
          before: { type: 'string', format: 'date-time' },
        },
        response: {
          '2xx': { type: 'array', items: 'event#' },
        },
      },
    },
    async (req, reply) => {
      const { teamId } = req.params;
      const { limit, before } = req.querystring || {};
      const events = await storage.mixed.eventForTeam(teamId, {
        pagination: { limit, before },
      });
      reply.send(events);
    }
  );

  next();
};
