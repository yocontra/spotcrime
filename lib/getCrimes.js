var request = require('superagent');
var baseUrl = 'http://spotcrime.com/crimes.json';

//example key
var spotCrimeApiToken = 'SFMyNTY.g2gDbQAAACQ1NjE4MDc1Ny00YWIwLTQ1YTMtYmUzOC0zZjU1OTc3MTc1MTluBgBNGK4ZfgFiAAFRgA.zoNkVc3npkM7Nrt2EW6AJ8cVNqucCUP1g7BLrE5LsUE';

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
      radius: radius
    }).set('spotcrime-api-token', spotCrimeApiToken)
      .then(({ body }) => body && body.crimes)
  if (!cb) return out


  out
    .then((crimes) => {
      if (!crimes) return cb(new Error('No response'));
      cb(null, crimes);
    })
    .catch(cb)
};
