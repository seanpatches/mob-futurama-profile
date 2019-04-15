const { Router } = require('express');
const Profile = require('../models/Profile');
const request = require('superagent');

module.exports = Router()
  .post('/', (req, res) => {
    const {
      name,
      favoriteCharacter
    } = req.body;
    
    request
      .get(`http://futuramaapi.herokuapp.com/api/characters/${favoriteCharacter}`)
      .then(result => result.body[0].quote)
      .then(tagline => {        
        Profile
          .create({ name, favoriteCharacter, tagline })
          .then(createdProfile => res.send(createdProfile));
      });
  })
  .get('/', (req, res) => {
    return Profile
      .find()
      .then(list => res.send(list));
  });
