var key = require('../utils/key');
var request = require('request');
var _ = require('underscore');
var options = require('./options');

// The API that returns the in-email representation.
module.exports = function(req, res) {
    var term = req.query.text.trim().replace('#', '-');

    getProfileInfo(term, req, res);
};

function getProfileInfo(term, req, res) {
  request({
      url: options.api.server + term + options.api.stats,
      json: true,
      timeout: 60 * 1000
  }, function(err, response) {
      if (err) {
        res.stats(500).send('Error');
      }

      var data = response.body.data;

      var html = '<b>' + data.username + '</b>' +
          '<p>SR: ' + data.competitive.rank + '</p>' +
          '<img src="' + data.avatar + '"/>';

      res.json({
        body: html
      })
  });
}