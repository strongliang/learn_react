'use strict';

var path = require('path');
var express = require('express');
var request = require('request');
var qs = require('qs');
var _ = require('lodash');

var app = express();
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/', function handler(req, res) {
    res.render('test.ejs', {});
}).listen(7777);

app.get('/usage', function handler(req, res) {
    var dummyData = {
        'diskspace': {
            __TOTAL__: 166496058094454,
            uspout: 1068020757477,
            populous: 49164300147,
            opsless: 815627,
            m3: 42949688267
        }
    };

    request({
        uri: 'http://localhost:15005/api/v1/accounting'
    }, function onResp(err, resp, body) {
        if (err || resp.statusCode !== 200) {
            // return callback(err);
            console.log(err);
            res.send(JSON.stringify(dummyData));
        } else {
            res.send(body);
        }
    });
});

function parseLagData(data) {
    var topics = _.map(data, function onObj(o) {
        var info = _.slice(
            o.target.match(/\S+\((\S+), \S+, \S+\)/)[1].split('.'),
            2, 6
        );
        var type = info[3];
        var res = {
            type: type,
            group: info[0],
            kluster: info[1],
            topic: info[2]
        };
        res[type] = _.reduce(
            _.map(o.datapoints, function onArr(arr) {
                return arr[0];
            })
        );
        return res;
    });

    var mergedTopics = {};
    topics.forEach(function onElem(elem, idx) {
        var topic = elem.topic;
        if (mergedTopics[topic] === undefined) {
            mergedTopics[topic] = {};
        }
        mergedTopics[topic] = _.merge(mergedTopics[topic], elem);
    });
    return mergedTopics;
}

app.get('/lag', function handler(req, res) {
    var dummyData = [{
        group: 'elk-apilogs-dsc-dca1',
        kluster: 'kafkaa',
        topic: 'api_driver_status_change',
        lag: 0
    }];
    var args = qs.stringify({
        target: [
            'summarize(servers.stargate01-*1.*.kafka*.*.lag-ms, "10min", "avg")',
            'summarize(servers.stargate01-*1.*.kafka*.*.incoming-eps, "10min", "avg")',
            'summarize(servers.stargate01-*1.*.kafka*.*.consuming-eps, "10min", "avg")'
        ],
        from: '-1h',
        until: 'now',
        format: 'json',
        maxDataPoints: 5
    }, {
        arrayFormat: 'repeat'
    });
    request({
        uri: 'http://localhost:14115/native/render/?' + args
    }, function onResp(err, resp, body) {
        if (err || resp.statusCode !== 200) {
            console.log(err);
            res.send(JSON.stringify(dummyData));
        } else {
            var result = (body);
            res.send(JSON.stringify(result));
        }
    });
});

app.get('/logstash', function handler(req, res) {
    var dummyData = [{
        'target': 'rtlogstash40-sjc1.rtsearch-rt-rtapi-BytesPerSec',
        'tags': {},
        'datapoints': [
          [null, 1459292400]
        ]
    }];
    var args = qs.stringify({
        target: [
            'aliasByNode(servers.rtlogstash*.kafka.consumer.ConsumerTopicMetrics.*-BytesPerSec.OneMinuteRate, 1, 5)',
            'aliasByNode(servers.elkdocker*.logstash.*.kafka.consumer.ConsumerTopicMetrics.BytesPerSec.*.*.OneMinuteRate, 1, 3, 8, 9)'
        ],
        from: '-1h',
        until: 'now',
        format: 'json',
        maxDataPoints: 1
    }, {
        arrayFormat: 'repeat'
    });
    request({
        uri: 'http://localhost:14115/native/render/?' + args
    }, function onResp(err, resp, body) {
        if (err || resp.statusCode !== 200) {
            console.log(err);
            res.send(JSON.stringify(dummyData));
        } else {
            var result = JSON.parse(body);
            result = _.map(result, function onObj(o) {
                var parts = o.target.split('.');
                var host = parts[0];
                if (_.startsWith(host, 'elkdocker')) {
                    return {
                        host: host,
                        pipeline: parts[1],
                        topic: parts[3]
                    };
                } else if (_.startsWith(host, 'rtlogstash')) {
                    return {
                        host: host,
                        groupTopic: parts[1].slice(
                            0, parts[1].length - '-BytesPerSec'.length
                        )
                    };
                }
                return parts;
            });
            res.send(JSON.stringify(result));
        }
    });
});

module.exports = app;
