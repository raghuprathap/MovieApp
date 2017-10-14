let Movie = require('../../model/movie');

module.exports = function(req, res)
{
  Movie.findOne({imdbID: req.body.imdbID, userId: req.body.userId}, function(err, movie) {
    if(err)
    {
      res.json({success: false, message: err});
    }
    else if (movie)
    {
      res.json({success: false, message: 'Movie is already exist'});
    }
    else
    {
      let insertMovie = new Movie();
      insertMovie.imdbID = req.body.imdbID;
      insertMovie.userId = req.body.userId.trim();
      insertMovie.title = req.body.title;
      insertMovie.poster = req.body.poster;
      insertMovie.voteAverage = req.body.voteAverage;
      insertMovie.voteCount = req.body.voteCount;
      insertMovie.releaseDate = req.body.releaseDate;
      insertMovie.save(function(error)
      {
        if(error)
        {
          res.json({success: false, message: error});
        }
        else
        {
           res.json({success: true, message: 'Movie is added successfully'});
        }
      });
    }
  });
};
