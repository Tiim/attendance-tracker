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
const envBool = {
  isProduction: env === 'production',
  isDev: env !== 'production',
  isTest: env === 'test',
};

const sessionSecret =
  process.env.SESSION_SECRET ||
  'a default secret with minimum length of 32 characters';

if (!envBool.isProduction && sessionSecret.includes('default')) {
  console.log(
    'WARNING: default session secret in production. Set SESSION_SECRET to an appropriate string'
  );
}
module.exports = {
  env,
  ...envBool,
  port: process.env.PORT || 8081,
  sessionSecret,
};
