var request = require('request');

var baseUrl = "http://api.spotcrime.com/crimes.json";
var key = ".";

module.exports = function(loc, radius, cb) {
  if (typeof radius === 'function') {
    cb = radius;
    radius = 0.01;
  }

  var rOpt = {
    url: baseUrl,
    json: true,
    qs: {
      lat: loc.lat,
      lon: loc.lon,
      key: key,
      radius: radius
    }
  };

  request(rOpt, function(err, res, body) {
    if (err) return cb(err);
    if (!body) return cb(new Error("No response"));
    cb(null, body.crimes);
  });

};
