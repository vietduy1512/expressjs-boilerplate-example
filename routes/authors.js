var express = require('express');
var router = express.Router();

var authorController = require('../controllers/authorController');

router.get('/create', authorController.author_create_get);

router.post('/create', authorController.author_create_post);

router.get('/:id/delete', authorController.author_delete_get);

router.post('/:id/delete', authorController.author_delete_post);

router.get('/:id/update', authorController.author_update_get);

router.post('/:id/update', authorController.author_update_post);

router.get('/:id', authorController.author_detail);

router.get('/', authorController.author_list);

module.exports = router;