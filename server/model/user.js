let mongoose = require('mongoose');
// let bcrypt = require('bcrypt');
let crypto = require('../utills/password');
let Schema = mongoose.Schema;

// Schema defines how the user data will be stored in MongoDB
let UserSchema = new Schema({
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	phone: String
});

// hash the user's password before inserting a new user
UserSchema.pre('save', function(next)
{
	let user = this;
	if(this.isModified('password') || this.isNew)
	{
		crypto.hash(user.password, function(error, hash)
		{
			if(error)
			{
				next(error);
			}
			user.password = hash;
			next();
		});
		/* bcrypt.genSalt(10, function(err, salt)
		{
			if(err)
			{
				next(err);
			}
			bcrypt.hash(user.password, salt, function(error, hash)
			{
				if(error)
				{
					next(error);
				}
				user.password = hash;
				next();
			});
		});*/
	}
	else
	{
		next();
	}
});


// Export the Model
module.exports = mongoose.model('user', UserSchema);