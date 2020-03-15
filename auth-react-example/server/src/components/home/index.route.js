const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');

router.get('/data',
  auth.isAuthenticated,
  function(req, res, next) {
    res.json({
      title: 'Data from backend',
      data: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
        'Item 5',
      ]
    });
});

module.exports = router;
