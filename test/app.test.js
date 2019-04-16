const Profile = require('../lib/models/Profile');
const request = require('supertest');
const app = require('../lib/app');

describe('futurama profile maker', () => {
  beforeEach(() => {
    return Profile.drop();
  });

  it('creates profile with Post', () => {
    
    return request(app)
      .post('/profiles')
      .send({
        name: 'dave',
        favoriteCharacter: 'bender'
      })
      .then(result => {
        expect(result.body).toEqual({
          name: 'dave',
          favoriteCharacter: 'bender',
          tagline: expect.any(String),
          _id: expect.any(String)
        });
      });
  });

  it('gets list of all profiles', () => {
    Profile
      .create({ name: 'dave' })
      .then(() => {
        return request(app)
          .get('/profiles')
          .then(result => {
            expect(result.body).toHaveLength(1);
          });
      });
  });

  it('gets a prof by id', () => {
    return Profile
      .create({
        name: 'sean',
        favoriteCharacter: 'Leela',
        tagline: 'Hi'
      })
      .then(created => {
        return request(app)
          .get(`/profiles/${created._id}`)
          .then(result => {
            expect(result.body).toEqual({
              name: 'sean',
              favoriteCharacter: 'Leela',
              tagline: expect.any(String),
              _id: expect.any(String)
            });
          });
      });
  });

  it('updates a profile', () => {
    return request(app)
      .post('/profiles')
      .send({ name: 'sean', favoriteCharacter: 'Leela' })
      .then(original => {
        return request(app)
          .patch(`/profiles/${original.body._id}`)
          .send({ favoriteCharacter: 'Bender' });
      })
      .then(result => {
        expect(result.body).toEqual({
          name: 'sean',
          favoriteCharacter: 'Bender',
          tagline: expect.any(String),
          _id: expect.any(String)
        });
      });
  });

  it('deletes a profile', () => {
    return request(app)
      .post('/profiles')
      .send({ name: 'sean', favoriteCharacter: 'Fry' })
      .then(original => {
        return request(app)
          .delete(`/profiles/${original.body._id}`);
      })
      .then(result => {
        expect(result.body).toEqual({ deleted: 1 });
      });
  });
});
