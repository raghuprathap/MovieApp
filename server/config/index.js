//  Basic Configuration Object
module.exports = {
  ImdbURL: 'http://api.themoviedb.org/3/search/movie?api_key=',
  apiKey: '0058d43a094e9d8f63318cf2d24d8f15',
  database: {
    local: 'mongodb://localhost:27017/movie'
  },
  auth: {
		secret: 'movie_app_secret'
	}
};
