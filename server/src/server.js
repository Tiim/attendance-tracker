const Fastify = require('fastify');
const cors = require('cors');
const morgan = require('morgan');
const fastify = Fastify({
  ignoreTrailingSlash: true,
});

const config = require('./config');

const api = require('./api');

fastify.use(cors());
fastify.use(morgan('dev'));

fastify.register(api, { prefix: '/api' });
fastify.get('/', (req, reply) => {
  reply.send({});
});

const startServer = async () => {
  try {
    const { port } = config;
    await fastify.listen(port, '0.0.0.0');
    console.log(`Listening on http://localhost:${port}`);
  } catch (err) {
    console.log(`Error ${err}`);
    process.exit(1);
  }
};

module.exports = { startServer };
