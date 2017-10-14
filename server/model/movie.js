let mongoose = require('mongoose');

// define the movieSchema model schema
let MovieSchema = mongoose.Schema;
const movie = new MovieSchema({
    imdbID: Number,
    userId: String,
    title: String,
    poster: String,
    voteCount: Number,
    voteAverage: Number,
    releaseDate: String,
    overview: String
});
movie.index({imdbID: 1, userId: 1}, {unique: true});
module.exports = mongoose.model('movie', movie);
