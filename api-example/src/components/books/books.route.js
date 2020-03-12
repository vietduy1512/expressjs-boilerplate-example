var express = require('express');
var router = express.Router();

var bookController = require('./books.controller');

router.get('/:id', bookController.book_detail);

router.get('/', bookController.book_list);

module.exports = router;