let Movie = require('../../model/movie');

module.exports = function(req, res) {
  Movie.find({userId: req.body.userId}, function(err, movies)
  {
    if (err)
    {
      res.json({success: false, message: err});
    }
    else
    {
      res.json({success: true, data: movies});
    }
  });
};
