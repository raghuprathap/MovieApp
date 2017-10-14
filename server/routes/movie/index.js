let express = require('express');
// let passport = require('passport');

let searchMovie = require('./searchMovie');
let addMovie = require('./addMovie');
let viewMovie = require('./viewMovie');
let deleteMovie = require('./deleteMovie');
const router = express.Router();

// api to protect all movie  routes

/* router.use(passport.authenticate('jwt', { session: false }), function(req, res, next) {
  next();
});*/
// api to search movie according to given title
router.get('/search/:title', searchMovie);
// api to add movie into database
router.post('/add', addMovie);
// api to get all stored movies
router.post('/view', viewMovie);
// api to delete a movie
router.delete('/delete', deleteMovie);

module.exports = router;
