const Fastify = require('fastify');
const cors = require('cors');
const morgan = require('morgan');
const cookie = require('fastify-cookie');
const session = require('fastify-session');
const fastifySensible = require('fastify-sensible');

const fastify = Fastify({
  ignoreTrailingSlash: true,
  logger: {
    level: 'warn',
    prettyPrint: { colorize: true },
  },
});

fastify.register(fastifySensible);
const config = require('./config');
const { addSchema } = require('./schema');
const api = require('./api');

fastify.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true,
  })
);
if (config.isProduction) {
  fastify.use(morgan('common'));
} else if (config.isDev && !config.isTest) {
  fastify.use(morgan('common'));
}

addSchema(fastify);

fastify.register(cookie);
//TODO change secret
fastify.register(session, {
  cookie: {
    httpOnly: true,
    secure: config.isProduction,
  },
  saveUninitialized: false,
  secret: config.sessionSecret,
});

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
