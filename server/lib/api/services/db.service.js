/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../../../config');

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(config.database);
const modelsDirectory = `${__dirname}/../models`;

fs.readdirSync(modelsDirectory)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = require(path.join(modelsDirectory, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
