'use strict';

var request = require('request');

var TopicApi = {
    getLagData: function getLagData(callback) {
        request({
            uri: window.location.origin + '/lag'
        }, function onResp(err, resp, body) {
            if (err || resp.statusCode !== 200) {
                return callback(err);
            }
            callback(null, JSON.parse(body));
        });
    },
    getTopicMap: function getTopicMap(callback) {
        request({
            uri: window.location.origin + '/topic-map'

        }, function onResp(err, resp, body) {
            if (err || resp.statusCode !== 200) {
                return callback(err);
            }
            callback(null, JSON.parse(body));
        });
    },
    getPipeline: function getPipeline(callback) {
        request({
            uri: window.location.origin + '/logstash'
        }, function onResp(err, resp, body) {
            if (err || resp.statusCode !== 200) {
                return callback(err);
            }
            callback(null, JSON.parse(body));
        });
    }
};
module.exports = TopicApi;

