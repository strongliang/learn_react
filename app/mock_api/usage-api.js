'use strict';

var request = require('request');

var UsageApi = {
    getUsage: function getUsage(callback) {
        request(
            'http://localhost:15005/api/v1/accounting',
            function onResp(err, resp, body) {
                if (err || resp.statusCode !== 200) {
                    return callback(err);
                }
                callback(null, body);
            });

    }
};
module.exports = UsageApi;

