const storage = require('../storage');

module.exports = function(fastify, opts, next) {
  fastify.get('/', async (req, reply) => {
    const result = await storage.event.getAll();
    reply.send(result);
  });
  fastify.get('/:id', async (req, reply) => {
    const { id } = req.params;
    const result = await storage.event.get(id);
    reply.send(result);
  });
  fastify.post('/', async (req, reply) => {
    const { date, teamId } = req.body;
    const parseddate = new Date(date);

    const res = await storage.event.insert(parseddate, teamId);
    reply.send(res);
  });

  fastify.post('/attendance', async (req, reply) => {
    const { id, eventId, personId, state } = req.body;
    let newId;
    if (id) {
      newId = await storage.attendance.update(id, eventId, personId, state);
    } else {
      newId = await storage.attendance.insert(eventId, personId, state);
    }
    const res = await storage.attendance.getSingle(newId);
    reply.send(res);
  });
  next();
};
