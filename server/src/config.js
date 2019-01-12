try {
  const dotenv = require('dotenv');
  require('dotenv').config();
  console.log('.env file loaded');
} catch (e) {
  console.log('dotenv file skipped');
}

module.exports = {
  port: process.env.PORT || 8081,
};
