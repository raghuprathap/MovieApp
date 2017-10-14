let jwt = require('jsonwebtoken');
let User = require('../../model/user');
let config = require('../../config');
let password = require('../../utills/password');

module.exports = function(req, res) {
  User.findOne({email: req.body.email}, function(err, user)
  {
    if(err)
    {
      res.json({success: false, message: err});
    }
    else if(user)
    {
      // password is correct or not
      password.validate(user.password, req.body.password, function(error, isMatch)
      {
        if (isMatch && !error)
        {
          let payload = {id: user.id, email: user.email};
          // Create token
          let token = jwt.sign(payload, config.auth.secret, {expiresIn: '10h'});
          res.cookie('token', token);
          res.json({
            success: true,
            message: 'Authentication successfull',
            token: token,
            userInfo: {firstName: user.firstName, lastName: user.lastName}});
        }
        else
        {
          res.json({success: false, message: 'Passwords is incorrect'});
        }
      });
    }
    else
    {
      res.json({success: false, message: 'You are not registered user'});
    }
  });
};