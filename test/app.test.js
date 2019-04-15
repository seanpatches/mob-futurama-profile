const Profile = require('../lib/models/Profile');
const request = require('supertest');
const app = require('../lib/app');
const superagent = require('superagent');

describe('futurama profile maker', () => {
  beforeEach(() => {
    return Profile.drop();
  });

  it('creates profile with Post', () => {
    
    return request(app)
      .post('/profiles')
      .send({
        name: 'dave',
        favoriteCharacter: 'bender',
        tagline: 'Hi I am bender'
      })
      .then(result => {
        console.log(result.body)
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
          .get('/')
          .then(result => {
            expect(result.body).toHaveLength(1);
          });
      });
    
      
  });
});
