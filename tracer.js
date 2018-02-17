/**
 * set up the jaeger tracer client
 */
var initTracer = require('jaeger-client').initTracer;

// See schema https://github.com/jaegertracing/jaeger-client-node/blob/master/src/configuration.js
var config = {
  serviceName: 'nodejs-service',
};
var options = {
  tags: {
    'nodejs-service.version': '0.6.0',
  }
};
var tracer = initTracer(config, options);

function localTracer() {
    return tracer;
}

module.exports = localTracer();

