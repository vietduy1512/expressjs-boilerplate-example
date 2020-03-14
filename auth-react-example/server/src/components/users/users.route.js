var express = require('express');
var router = express.Router();

router.get('/users/signup', function(req, res, next) {
  res.json('Signed');
});

router.post('/users/signup', function(req, res, next) {
  res.json('Signed');
});

module.exports = router;
