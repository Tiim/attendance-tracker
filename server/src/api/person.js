const storage = require('../storage');

module.exports = function(fastify, opts, next) {
  fastify.get(
    '/',
    {
      schema: {
        response: {
          '2xx': { type: 'array', items: 'person#' },
        },
      },
    },
    async (req, reply) => {
      const result = await storage.person.getAll();
      reply.send(result);
    }
  );

  fastify.put(
    '/',
    {
      schema: {
        body: 'person#',
        response: { '2xx': 'person#' },
      },
    },
    async (req, reply) => {
      const res = await storage.person.upsert(req.body);
      reply.send(res);
    }
  );

  fastify.get(
    '/:personId',
    {
      schema: {
        params: {
          personId: { type: 'integer' },
        },
        response: { '2xx': 'person#' },
      },
    },
    async (req, reply) => {
      const { personId } = req.params;
      const result = await storage.person.get(personId);
      reply.send(result);
    }
  );

  fastify.delete(
    '/:personId',
    {
      schema: {
        params: {
          personId: { type: 'integer' },
        },
      },
    },
    async (req, reply) => {
      const { personId } = req.params;
      await storage.person.delete(personId);
      reply.send();
    }
  );

  fastify.get(
    '/:personId/events',
    {
      schema: {
        params: {
          personId: { type: 'integer' },
        },
        response: {
          '2xx': { type: 'array', items: 'event#' },
        },
      },
    },
    async (req, reply) => {
      const { personId } = req.params;
      const events = await storage.mixed.eventForPerson(personId);
      reply.send(events);
    }
  );

  next();
};
