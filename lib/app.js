const express = require('express');
const app = express();
const { parse } = require('url');
const profileRouter = require('../lib/routes/profileRouter');
const errorHandler = require('../lib/middleware/errorHandler');
const notFound = require('../lib/middleware/notFound');


app.use(express.json());

app.use('/profiles', profileRouter);

app.use(notFound);

app.use(errorHandler);

module.exports = app;
