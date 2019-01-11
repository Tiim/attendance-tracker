module.exports = {
  client: 'pg',
  version: '11.1',
  connection: {
    host: process.env.DATABASE_HOST || '127.0.0.1',
    user: process.env.DATABASE_USER || 'debug',
    password: process.env.DATABASE_PASS || '123456',
    database: process.env.DATABASE_NAME || 'attendance',
  },
  pool: { min: 0, max: 5 },
};
