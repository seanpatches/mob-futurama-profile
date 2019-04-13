# Futurama Profile

Futurama Profile creates a user profile based on their favorite Futurama character.
The profile includes a tagline, which is a quote by the users favorite character.

## Model

* Create a `Profile` model
* `Profile` has
  * `name`
  * `favoriteCharacter`
  * `tagline`

## Service

* Create a `futuramaApi.js` service
  * use [http://futuramaapi.herokuapp.com/](http://futuramaapi.herokuapp.com/)
* Create a mock for `futuramaApi.js`
  * Create a unique mocked quote for each possible `favoriteCharacter`

## Routes

* POST `/profile`
  * create a new profile
  * fetch a tagline from [http://futuramaapi.herokuapp.com/](http://futuramaapi.herokuapp.com/)
    * The tagline is a random quote
    * the random quote should be by the `favoriteCharacter`
* GET `/profile`
  * get a list of all profiles
* GET `/profile/:id`
  * get a profile by id
* PATCH `/profile/:id`
  * allow users to update their `favoriteCharacter` (**NOT** `name` or `tagline`)
  * if the user updates their `favoriteCharacter` fetch a new tagline
* DELETE `/profile/:id`
  * delete a profile by id
* BONUS
  * PATCH `/profile/:id/tagline`
    * fetch a new random quote and update the tagline
  * Add an array of favorite quotes (profile now has name, favoriteCharacter,
    tagline, and favoriteQuotes)
    * PATCH `/profile/:id/favorite`
      * send a body with `{ quote: <index> }`
      * fetch all futurama quotes
      * add the quote with index (from the array of all futurama quotes)
        to the favoriteQuotes array.
