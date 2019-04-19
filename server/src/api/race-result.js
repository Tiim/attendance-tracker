const storage = require('../storage');

module.exports = function(fastify, opts, next) {
  fastify.put(
    '/',
    {
      schema: {
        body: 'race-result#',
        response: { '2xx': 'race-result#' },
      },
    },
    async (req, reply) => {
      const result = req.body;
      const res = storage.raceResult.upsert(result);
      reply.status(201).send(res);
    }
  );

  next();
};
