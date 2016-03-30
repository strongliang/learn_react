'use strict';

var request = require('request');

var TopicApi = {
    getLagData: function getLagData(callback) {
        request(
            'http://localhost:7777/lag',
            function onResp(err, resp, body) {
                if (err || resp.statusCode !== 200) {
                    return callback(err);
                }
                callback(null, JSON.parse(body));
            });
    },
    getPipeline: function getPipeline(callback) {
        request(
            'http://localhost:7777/logstash',
            function onResp(err, resp, body) {
                if (err || resp.statusCode !== 200) {
                    return callback(err);
                }
                callback(null, JSON.parse(body));
            });
    }
};
module.exports = TopicApi;

