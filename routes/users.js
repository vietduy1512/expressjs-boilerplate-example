var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.send('List of users');
});

router.get('/info', function(req, res, next) {
  res.send('User info');
});

module.exports = router;
