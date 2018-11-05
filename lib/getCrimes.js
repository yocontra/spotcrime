var request = require('superagent');

var baseUrl = 'http://api.spotcrime.com/crimes.json';
var key = 'heythisisforpublicspotcrime.comuse-forcommercial-or-research-use-call-877.410.1607-or-email-pyrrhus-at-spotcrime.com';

module.exports = function(loc, radius, cb) {
  if (typeof radius === 'function') {
    cb = radius;
    radius = null;
  }
  if (!radius) radius = 0.01;
  const out = request.get(baseUrl)
    .type('json')
    .query({
      lat: loc.lat,
      lon: loc.lon,
      key: key,
      radius: radius
    }).then(({ body }) => body && body.crimes)
  if (!cb) return out


  out
    .then((crimes) => {
      if (!crimes) return cb(new Error('No response'));
      cb(null, crimes);
    })
    .catch(cb)
};
