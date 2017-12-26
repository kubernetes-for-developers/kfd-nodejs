/**
 * set up the redis client and toss that onto the app for use elsewhere as well...
 */
var nconf = require('nconf');
var redis = require('redis');
var debug = require('debug')('kfd-nodejs:server');
var db;

function connectRedis() {
    if (!db) {
        db = redis.createClient(6379, nconf.get('db'));
        db.on('error', function (err) {
          debug('Error ' + err);
        })
    }
    return db;
}

module.exports = connectRedis();

