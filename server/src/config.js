let res;
try {
  /* eslint-disable node/no-unpublished-require */
  res = require('dotenv').config();
} catch (err) {
  res = { error: err };
}

if (res.error) {
  console.log('.env file not loaded');
}
console.log('.env file loaded');

module.exports = {
  port: process.env.PORT || 8081,
};
