const request = require('supertest');
var chai = require('chai')
  , expect = chai.expect
  , should = chai.should();

var app = require('../app');

describe('express app', function() {
    it('should respond at the root', function(done) {
        request(app).get('/')
        .expect(200, done)
    });

    it('should respond at the liveness probe point', function(done) {
        request(app).get('/probes/alive')
        .expect(200)
        .end(function(err, res) {
            // var util = require('util');
            // console.log(util.inspect(res));
            expect(res.text).to.equal("yes");
            expect(err).to.be.null;
            done();
        });
    });

});