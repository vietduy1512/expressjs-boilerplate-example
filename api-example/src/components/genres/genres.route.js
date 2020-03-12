var express = require('express');
var router = express.Router();

var genreController = require('./genres.controller');

router.post('/create', genreController.genre_create_post);

router.get('/:id', genreController.genre_detail);

router.get('/', genreController.genre_list);

module.exports = router;