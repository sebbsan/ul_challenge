/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const { readdirSync } = require('fs');
const { basename, join } = require('path');
const Sequelize = require('sequelize');
const { database } = require('../../../config');

const baseFileName = basename(__filename);
const db = {};

const sequelize = new Sequelize(database);
const modelsDirectory = `${__dirname}/../models`;

readdirSync(modelsDirectory)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== baseFileName && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = require(join(modelsDirectory, file))(sequelize, Sequelize.DataTypes);
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
