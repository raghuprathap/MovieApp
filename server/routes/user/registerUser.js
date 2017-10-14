let User = require('../../model/user');

module.exports = function(req, res) {
  User.findOne({email: req.body.email}, function(err, userData)
  {
    if(err)
     {
       res.json({success: false, message: err});
     }
     else if(userData)
     {
       res.json({success: false, message: 'Email id is already registered'});
     }
     else
     {
       let newUser = new User();
       newUser.email = req.body.email;
       newUser.password = req.body.password;
       newUser.firstName = req.body.firstName;
       newUser.lastName = req.body.lastName;
       if(req.body.phone !== null && req.body.phone !== '')
       {
         newUser.phone = req.body.phone;
       }
       newUser.save(function(error) {
         if(error)
         {
           res.json({success: false, message: error});
         }
         else
         {
           res.json({success: true, message: 'Successfully registered'});
         }
       });
     }
   });
 };
