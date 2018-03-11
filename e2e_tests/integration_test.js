const request = require('supertest');
const k8s = require('@kubernetes/client-node');
const util = require('util');
const path = require('path');
const _ = require('lodash');

var chai = require('chai')
  , expect = chai.expect
  , should = chai.should();

var k8sApi = k8s.Config.defaultClient();

describe('kubernetes', function() {

  describe('cluster', function() {

    it('should have a healthy cluster', function() {
      return k8sApi.listComponentStatus()
      .then((res) => {
        // console.log(util.inspect(res.body));
        res.body.items.forEach(function(component) {
          // console.log(util.inspect(value));
          expect(component.conditions[0].type).to.equal("Healthy");
          expect(component.conditions[0].status).to.equal("True");
        })
      }, (err) => {
        expect(err).to.be.null;
      });
    })

    it('should deploy the manifests', function() {
      var manifest_directory = path.normalize(path.join(path.dirname(__filename), '..', '/deploy'))

      const exec = util.promisify(require('child_process').exec);
      return exec('kubectl apply -f '+manifest_directory)
      .then((res) => {
        // console.log(util.inspect(res));
        expect(res.stdout).to.not.be.null;
        expect(res.stderr).to.be.empty;
      }, (err) => {
        expect(err).to.be.null;
      })
    })

    describe('should repeat until the pods are ready', function() {
      // Mocha supports a retry mechanism limited by number of retries...
      this.retries(30);
      // an a default timeout of 20,000ms that we can increase...
      this.timeout(160000);
      // for shelling out and describing thorugh kubectl
      const exec = util.promisify(require('child_process').exec);

      it('check to see that all pods are reporting ready', function() {
        return new Promise(function(resolve, reject) {
          console.log(' - delay 10 seconds...')
          setTimeout(() => resolve(1), 10000);
        }).then(function(result) {
          return exec('kubectl describe deploy nodejs')
          .then((res) => {
              // uncomment this line to get more details about current state
              // of the deployment in progress
              //console.log(" - - "+res.stdout);
              expect(res.stdout).to.not.be.null;
              expect(res.stderr).to.be.empty;
          }, (err) => {
              expect(err).to.be.null;
          })

        }).then(function(result) {
          return  k8sApi.listNamespacedPod('default')
          .then((res) => {
            res.body.items.forEach(function(pod) {
              var readyCondition = _.filter(pod.status.conditions, { 'type': 'Ready' })
              console.log(" - - checking: "+pod.metadata.name+" ready: "+readyCondition[0].status);
              expect(readyCondition[0].status).to.equal('True')
            }) // pod forEach
          })
        })
      }) // it
    }); // describe - pods available

    describe('should interact with the deployed services', function() {
      // path to access the port through the kubectl proxy:
      // http://localhost:8001/api/v1/namespaces/default/services/nodejs-service:web/proxy/

      it('should access by pod...', function() {
        return k8sApi.proxyGETNamespacedServiceWithPath("nodejs-service:web", "default", "/")
        .then(function(res) {
          // console.log(util.inspect(res,{depth:1}));
          expect(res.body).to.not.be.null;
        });
      })

    }) // interact with the deployed services

  }); //describe - cluster

}); // describe - kubernetes
