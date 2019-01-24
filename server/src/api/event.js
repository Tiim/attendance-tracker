const storage = require('../storage');

module.exports = function(fastify, opts, next) {
  fastify.put('/', async (req, reply) => {
    req.body.date = new Date(req.body.date);
    const res = await storage.event.upsert(req.body);
    reply.send(res);
  });

  fastify.get('/:eventId', async (req, reply) => {
    const { eventId } = req.params;
    const result = await storage.event.get(eventId);
    reply.send(result);
  });

  fastify.delete('/:eventid', async (req, reply) => {
    const { eventId } = req.params;
    await storage.event.delete(eventId);
    reply.send();
  });

  fastify.put('/attendance', async (req, reply) => {
    const res = await storage.attendance.upsert(req.body);
    reply.send(res);
  });
  next();
};
