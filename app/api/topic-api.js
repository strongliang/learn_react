'use strict';

var request = require('request');

var TopicApi = {
    getLagData: function getLagData(callback) {
        request(
            window.location.origin + '/lag',
            function onResp(err, resp, body) {
                if (err || resp.statusCode !== 200) {
                    return callback(err);
                }
                callback(null, JSON.parse(body));
            });
    },
    getPipeline: function getPipeline(callback) {
        request(
            window.location.origin + '/logstash',
            function onResp(err, resp, body) {
                if (err || resp.statusCode !== 200) {
                    return callback(err);
                }
                callback(null, JSON.parse(body));
            });
    }
};
module.exports = TopicApi;

