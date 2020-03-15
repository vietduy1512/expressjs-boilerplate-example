const express = require('express');
const router = express.Router();
const authController = require('./auth.controller')
const passport = require('../../passport')

router.post('/auth/login',passport.authenticate('local'), authController.login);

router.post('/auth/register', authController.register);

router.post('/auth/logout', authController.logout);

router.get('/auth/currentUser', authController.currentUser);

module.exports = router;
