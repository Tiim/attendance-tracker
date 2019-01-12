const connection = process.env.DATABASE_CONNECTION_URL
  ? process.env.DATABASE_CONNECTION_URL
  : {
      host: process.env.DATABASE_HOST || '127.0.0.1',
      user: process.env.DATABASE_USER || 'debug',
      password: process.env.DATABASE_PASS || '123456',
      database: process.env.DATABASE_NAME || 'attendance',
    };

module.exports = {
  client: 'pg',
  version: '11.1',
  connection,
  pool: { min: 0, max: 5 },
};
