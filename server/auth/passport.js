let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;
let User = require('../model/user');
let config = require('../config');

//  setup JWT passport strategy
module.exports = function(passport) {
	let options = {jwtFromRequest: ExtractJwt.fromAuthHeader(), secretOrKey: config.auth.secret};
	passport.use(new JwtStrategy(options, function(payload, done) {
		User.findById(payload.id, function(err, user) {
			if(err)
      {
				done(err, false);
			}
			else if(user)
      {
				done(null, user);
			}
			else
      {
				done(null, false);
			}
		});
	}));
};
