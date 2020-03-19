const express = require('express');
const router = express.Router();
const controller = require('./auth.controller')
const validator = require('./auth.validator')
const passport = require('../../passport')

router.post('/auth/login', passport.authenticate('local'), controller.login);

router.post('/auth/register', validator.register, controller.register);

router.post('/auth/logout', controller.logout);

router.get('/auth/currentUser', controller.currentUser);

module.exports = router;
