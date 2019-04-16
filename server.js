const app = require('./lib/app');

app.listen(process.env.PORT || 6666, () => {
  console.log('Someone has connected');
});
