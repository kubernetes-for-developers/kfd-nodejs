var express = require('express');
var router = express.Router();
var util = require('util');
var db = require('../db');

/* GET liveness probe response. */
router.get('/alive', function(req, res, next) {
    res.send('yes');  
});

/* GET readiness probe response. */
router.get('/ready', async function(req, res, next) {
    try {
      let pingval = await db.ping()
      if (pingval) {
        res.send('yes');
      } else {
        res.status(500).json({ error: "redis.ping was false" })  
      }
    } catch (error) {
      res.status(500).json({ error: error.toString() })
    }
    
});
  
module.exports = router;
