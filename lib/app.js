const express = require('express');
const app = express();
const { parse } = require('url');


app.use((res, req, next) => {
  console.log(req);
  res.end(console.log('connected?'));
});

module.exports = app;
