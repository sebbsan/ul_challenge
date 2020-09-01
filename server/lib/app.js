/* eslint-disable no-console */
const express = require('express');
const { urlencoded, json } = require('body-parser');
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

app.use(urlencoded({ extended: false }));
app.use(json());

app.post('/register', register);
app.post('/login', login);

app.use(errorHandler);
module.exports = app;
