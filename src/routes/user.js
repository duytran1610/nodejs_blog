const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/userController');

router.post('/loginForm/login', userController.Login);
router.post('/signupForm/signup', userController.Signup);
router.get('/loginForm', userController.LoginForm);
router.get('/signupForm', userController.SignupForm);
router.get('/logout', userController.Logout);


module.exports = router;