const { Router } = require('express');
const Profile = require('../models/Profile');
const getQuote = require('../services/futuramaApi');

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
  
  })

  .patch('/:id', (req, res) => {
    const { id } = req.params;
    const {
      favoriteCharacter
    } = req.body;

    Profile
      .findById(id)
      .then(oldObj => {
        return Promise.all([
          getQuote(favoriteCharacter),
          Promise.resolve(oldObj.name)
        ])
          .then(([tagline, name]) => {
            return Profile
              .findByIdAndUpdate(id, { name, favoriteCharacter, tagline })
              .then(updated => res.send(updated));
          });
      });
  })

  .delete('/:id', (req, res) => {
    const { id } = req.params;

    Profile
      .findByIdAndDelete(id)
      .then(verification => {
        res.send(verification);
      });

  });
