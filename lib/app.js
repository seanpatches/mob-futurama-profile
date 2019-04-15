const express = require('express');
const app = express();
const { parse } = require('url');
const profileRouter = require('../lib/routes/profileRouter');

app.use(express.json());

app.use('/profiles', profileRouter);

module.exports = app;
