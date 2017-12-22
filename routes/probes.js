var express = require('express');
var router = express.Router();

/* GET liveness probe response. */
router.get('/alive', function(req, res, next) {
  res.send('yes');
});

/* GET readiness probe response. */
router.get('/ready', function(req, res, next) {
    res.send('yes');
  });
  
module.exports = router;
