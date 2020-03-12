var express = require('express');
var router = express.Router();

var bookinstanceController = require('./bookinstances.controller');

router.get('/:id', bookinstanceController.bookinstance_detail);

router.get('/', bookinstanceController.bookinstance_list);

module.exports = router;