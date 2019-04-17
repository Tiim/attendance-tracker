const Fastify = require('fastify');
const cors = require('cors');
const morgan = require('morgan');
const cookie = require('fastify-cookie');
const session = require('fastify-session');
const KnexSessionStore = require('connect-session-knex')(session);
const fastifySensible = require('fastify-sensible');

const { knex } = require('./db');

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

const store = new KnexSessionStore({
  knex,
  tablename: 'session',
  createtable: true,
  clearInterval: 1000 * 60 * 30, //30 Min
});

fastify.register(cookie);
fastify.register(session, {
  cookie: {
    httpOnly: true,
    secure: config.isProduction,
    maxAge: 1000 * 60 * 60 * 24 * 365, //1y
  },
  saveUninitialized: false,
  secret: config.sessionSecret,
  store,
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
