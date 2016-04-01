'use strict';

var request = require('request');

var UsageApi = {
    getUsage: function getUsage(callback) {
        request(
            window.location.origin + '/usage',
            function onResp(err, resp, body) {
                if (err || resp.statusCode !== 200) {
                    return callback(err);
                }
                // console.log(body);
                // console.log(JSON.parse(body));
                callback(null, JSON.parse(body));
            });

    }
};
module.exports = UsageApi;

