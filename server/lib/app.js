/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const register = require('./api/controllers/register.controller');
const login = require('./api/controllers/login.controller');

const app = express();

const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err && err.error) {
    console.error(err);
    res.status(err.status ? Number(err.status) : 400).json({
      type: err.type,
      message: err.error.toString(),
    });
  } else {
    next(err);
  }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/register', register);
app.post('/login', login);

app.use(errorHandler);
module.exports = app;
