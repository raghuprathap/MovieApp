let Movie = require('../../model/movie');

module.exports = function(req, res) {
  let movieId = req.body.id;
  let userId = req.body.userId;
  Movie.remove({imdbID: movieId, userId: userId}, function(err)
  {
    if(err)
    {
      res.json({success: false, message: err});
    }
    else
    {
      res.json({success: true, message: 'Movie is deleted successfully'});
    }
  });
};
