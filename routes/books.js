var express = require('express');
var router = express.Router();

var bookController = require('../controllers/bookController');

router.get('/create', bookController.book_create_get);

router.post('/create', bookController.book_create_post);

router.get('/:id/delete', bookController.book_delete_get);

router.post('/:id/delete', bookController.book_delete_post);

router.get('/:id/update', bookController.book_update_get);

router.post('/:id/update', bookController.book_update_post);

router.get('/:id', bookController.book_detail);

router.get('/', bookController.book_list);

module.exports = router;