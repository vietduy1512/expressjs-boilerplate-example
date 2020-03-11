var express = require('express');
var router = express.Router();

var genreController = require('../controllers/genreController');

router.get('/create', genreController.genre_create_get);

router.post('/create', genreController.genre_create_post);

router.get('/:id/delete', genreController.genre_delete_get);

router.post('/:id/delete', genreController.genre_delete_post);

router.get('/:id/update', genreController.genre_update_get);

router.post('/:id/update', genreController.genre_update_post);

router.get('/:id', genreController.genre_detail);

router.get('/', genreController.genre_list);

module.exports = router;