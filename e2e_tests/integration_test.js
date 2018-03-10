var assert = require('assert');

describe('integration Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});

describe('kubernetes', function() {
  it('should list pods', function() {
    const k8s = require('@kubernetes/client-node');

    var k8sApi = k8s.Config.defaultClient();
    var util = require('util');
    // console.log(util.inspect(k8sApi));
    return k8sApi.listNamespacedPod('default')
    .then((res) => {
      // console.log(util.inspect(res));
      console.log(res.body);
    },
    (err) => {
      console.log('Error!: ' + err);
    });
  })
})