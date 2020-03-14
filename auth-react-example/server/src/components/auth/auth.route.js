var express = require('express');
var router = express.Router();
let authController = require('./auth.controller')

router.post('/auth/login', authController.login);

router.post('/auth/register', authController.register);

router.post('/auth/logout', authController.logout);

router.get('/auth/currentUser', authController.currentUser);

module.exports = router;
