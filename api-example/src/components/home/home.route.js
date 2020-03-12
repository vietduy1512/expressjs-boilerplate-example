var express = require('express');
var router = express.Router();

var homeController = require('./home.controller');

router.get('/', homeController.index);

router.get('/badRequest', homeController.badRequest);

router.get('/internalServerError', homeController.internalServerError);

module.exports = router;
