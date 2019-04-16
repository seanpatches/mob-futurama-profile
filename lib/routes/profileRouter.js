const { Router } = require('express');
const Profile = require('../models/Profile');
const getQuote = require('../services/futuramaApi');
const request = require('superagent');

module.exports = Router()
  .post('/', (req, res) => {
    const {
      name,
      favoriteCharacter
    } = req.body;
    
    return getQuote(favoriteCharacter)
      .then(tagline => {
        console.log(tagline);
        Profile
          .create({ name, favoriteCharacter, tagline })
          .then(createdProfile => res.send(createdProfile));
      });
  })

  .get('/', (req, res) => {
    return Profile
      .find()
      .then(list => res.send(list));
  })

  .get('/:id', (req, res) => {
    const { id } = req.params;

    Profile
      .findById(id)
      .then(found => res.send(found));
  
  });
