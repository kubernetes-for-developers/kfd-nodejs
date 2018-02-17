var express = require('express');
var router = express.Router();
var util = require('util');
var db = require('../db');
var tracer = require('../tracer');
const { Tags } = require('opentracing')

/* GET liveness probe response. */
router.get('/alive', function(req, res, next) {
    res.send('yes');  
});

/* GET readiness probe response. */
router.get('/ready', async function(req, res, next) {
    const span = tracer.startSpan('redis_ping')
    try {
      let pingval = await db.ping()
      if (pingval) {
        res.send('yes');
        span.setTag("RedisPing", true)
        span.finish()
      } else {
        span.setTag("RedisPing", false)
        span.finish()
        res.status(500).json({ error: "redis.ping was false" })  
      }
    } catch (error) {
      span.setTag(Tags.ERROR, error.toString())
      span.finish()
      res.status(500).json({ error: error.toString() })
    }
    
});
  
module.exports = router;
