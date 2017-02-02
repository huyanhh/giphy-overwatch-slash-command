var key = require('../utils/key');
var request = require('request');
var _ = require('underscore');
var options = require('./options');


// The Type Ahead API.
module.exports = function(req, res) {
    var term = req.query.text.trim().replace('#', '-');
    if (!term) {
        res.json([{
            title: '<i>Enter a US PC Battle Tag (i.e. FrostyFeet#124767) ' +
            'and a search term (games, playtime, SR)</i>',
            text: ''
        }]);
        return;
    }

    var results = [];

    request({
        url: options.api.server + term + options.api.stats,
        json: true,
        timeout: 60 * 1000
        // Overwatch servers take a while to process, so maybe increase more
    }, function (err, response) {
        if (err || response.statusCode !== 200 || !response.body || !response.body.data) {
            res.status(500).send('Error');
            return;
        }

        var data = response.body.data;

        results.push({
            title: data.username + ', Level: ' + data.level,
            text: term.replace('-', '#')
        });

        if (results.length === 0) {
            res.json([{
                title: '<i>(no results)</i>',
                text: ''
            }]);
        } else {
            res.json(results);
        }
    })
};
