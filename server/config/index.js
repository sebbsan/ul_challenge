const dotenv = require('dotenv');
const databaseConfig = require('./config.json');

dotenv.config();

const currentEnvDatabaseConfig = databaseConfig[process.env.NODE_ENV];
const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3001,
  database: {
    dialect: 'sqlite',
    storage: currentEnvDatabaseConfig.storage || './db/database-test.sqlite3',
  },
};

module.exports = config;
