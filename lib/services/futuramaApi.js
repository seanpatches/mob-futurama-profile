const request = require('superagent');

function getQuote(favoriteCharacter) {
  return request
    .get(`http://futuramaapi.herokuapp.com/api/characters/${favoriteCharacter}`)
    .then(result => result.body[0].quote);
}

module.exports = getQuote;
