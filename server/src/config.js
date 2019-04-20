const path = require('path');
const dotenv = require('dotenv');
const envfile = ['.env', 'default.env'];
const parsed = envfile.find(
  (file) =>
    dotenv.config({
      path: path.resolve(__dirname, '../../', file),
    }).parsed
);
console.log(`Loaded env file: ${parsed}`);

let env = process.env.NODE_ENV;
if (!env) {
  env = 'development';
}
const envBool = {
  isProduction: env === 'production',
  isDev: env !== 'production',
  isTest: env === 'test',
};

if (envBool.isProduction && process.env.ENV_FILE.includes('default')) {
  console.log('WARNING: default env file in production.');
}
module.exports = {
  env,
  ...envBool,
  port: process.env.PORT,
  sessionSecret: process.env.SESSION_SECRET,
};
