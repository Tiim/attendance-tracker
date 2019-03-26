const Fastify = require('fastify');
const cors = require('cors');
const morgan = require('morgan');
const fastify = Fastify({
  ignoreTrailingSlash: true,
  logger: {
    level: 'warn',
    prettyPrint: { colorize: true },
  },
});

const config = require('./config');
const { addSchema } = require('./schema');
const api = require('./api');

fastify.use(cors());
if (config.isProduction) {
  fastify.use(morgan('common'));
} else if (config.isDev && !config.isTest) {
  fastify.use(morgan('common'));
}

addSchema(fastify);

fastify.register(api, { prefix: '/api' });
fastify.get('/', (req, reply) => {
  reply.send({ apis: ['/api'] });
});

const { port } = config;
fastify.listen(port, '0.0.0.0');
if (!config.isTest) {
  console.log(`Listening on http://localhost:${port}`);
}

module.exports = { fastify };
