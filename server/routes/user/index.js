let express = require('express');
let router = express.Router();
let registerUser = require('./registerUser');
let loginUser = require('./loginUser');

// register user
router.post('/register', registerUser);
// Authenticate the user and get a JSON Web Token to include in the header of future requests.
router.post('/login', loginUser);

module.exports = router;
