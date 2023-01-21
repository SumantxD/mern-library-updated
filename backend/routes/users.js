const router = require('express').Router()

//controller functions
const {signupUser,loginUser} = require('../controllers/userControllers')

// login route
//http://localhost:3000/user/login/
router.post('/login/', loginUser);


// signup route
http://localhost:3000/user/signup/
router.post('/signup/', signupUser);

module.exports = router