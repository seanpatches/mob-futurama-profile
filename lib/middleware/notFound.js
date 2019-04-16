//eslint-disable-next-line
module.exports = (req, res, next) => {
  res.status(404);
  res.send({ error: 'Unable Found' });
};
