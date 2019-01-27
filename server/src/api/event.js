const storage = require('../storage');

module.exports = function(fastify, opts, next) {
  fastify.put(
    '/',
    {
      schema: {
        body: 'event#',
        response: {
          '2xx': 'event#',
        },
      },
    },
    async (req, reply) => {
      req.body.date = new Date(req.body.date);
      const res = await storage.event.upsert(req.body);
      reply.send(res);
    }
  );

  fastify.get(
    '/:eventId',
    {
      schema: {
        querystring: {
          eventId: { type: 'integer' },
        },
        response: {
          '2xx': 'event#',
        },
      },
    },
    async (req, reply) => {
      const { eventId } = req.params;
      const result = await storage.event.get(eventId);
      reply.send(result);
    }
  );

  fastify.delete(
    '/:eventid',
    {
      schema: {
        querystring: {
          eventId: { type: 'integer' },
        },
      },
    },
    async (req, reply) => {
      const { eventId } = req.params;
      await storage.event.delete(eventId);
      reply.status(204).send();
    }
  );

  fastify.put(
    '/attendance',
    {
      schema: {
        body: 'attendance#',
        response: {
          '2xx': 'attendance#',
        },
      },
    },
    async (req, reply) => {
      const res = await storage.attendance.upsert(req.body);
      reply.status(201).send(res);
    }
  );
  next();
};
