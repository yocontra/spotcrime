var spotcrime = require('../');
var should = require('should');
require('mocha');

describe('spotcrime', function() {
  describe('getCrimes()', function() {
    it('should work for NYC', function(done) {
      var loc = {
        lat: 33.39657,
        lon: -112.03422
      };

      spotcrime.getCrimes(loc, 0.01, function(err, crimes) {
        should.not.exist(err);
        should.exist(crimes);
        Array.isArray(crimes).should.equal(true);
        done();
      });
    });
  });
});
