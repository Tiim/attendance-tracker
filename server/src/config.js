try {
  /* eslint-disable node/no-unpublished-require */
  require('dotenv').config();
} catch (err) {
  console.log('dotenv not installed, skipping .env reading');
}

let env = process.env.NODE_ENV;
if (!env) {
  env = 'development';
}

module.exports = {
  env,
  isProduction: env === 'production',
  isDev: env !== 'production',
  isTest: env === 'test',
  port: process.env.PORT || 8081,
};
