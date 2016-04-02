'use strict';

var path = require('path');
var express = require('express');
var request = require('request');
var qs = require('qs');
var _ = require('lodash');
var zookeeper = require('node-zookeeper-client');

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
    // FIXME: some fields should be array insteads of a single value
    // the solution is to use an object to build them up, instead of
    // doing just a map
    var topics = _.map(data, function onObj(o) {
        var info = _.slice(
            o.target.match(/\S+\((\S+), \S+, \S+\)/)[1].split('.'),
            1, 6
        );
        var type = info[4];
        var res = {
            type: type,
            group: info[1],
            kluster: info[2],
            topic: info[3],
            dc: info[0].split('-')[1]
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
        if (elem[elem.type] === null) {
            // filter out the topics that don't have data
            return;
        }
        if (mergedTopics[topic] === undefined) {
            mergedTopics[topic] = {};
        }
        mergedTopics[topic] = _.merge(mergedTopics[topic], elem);
    });
    // TODO: better just return the object and get the values in the front end
    // keyed objects are easier to handle as raw data
    return _.values(mergedTopics);
}

app.get('/lag', function handler(req, res) {
    var dummyData = [{
        type: 'lag-ms',
        group: 'rtsearch',
        kluster: 'kafkab',
        dc: 'sjc1',
        topic: 'xo_api-params-diff',
        'consuming-eps': 0,
        'incoming-eps': 0,
        'lag-ms': 0
    }];
    var args = qs.stringify({
        target: [
            'summarize(servers.stargate01-*.*.kafka*.*.lag-ms, "10min", "avg")',
            'summarize(servers.stargate01-*.*.kafka*.*.incoming-eps, "10min", "avg")',
            'summarize(servers.stargate01-*.*.kafka*.*.consuming-eps, "10min", "avg")'
        ],
        from: '-10min',
        until: 'now',
        format: 'json',
        maxDataPoints: 50
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
            // console.log(JSON.parse(body));
            var result = parseLagData(JSON.parse(body));
            // console.log(result);
            res.send(JSON.stringify(result));
        }
    });
});

app.get('/zk', function handler(req, res) {
    // var zkclient = zookeeper.createClient(
    //     'kloakzk01-sjc1,kloakzk02-sjc1/kloak-sjc1a'
    // );
    // var zkpath = req.args.zkpath;
    // function listChildren(client, path) {
    //     client.getChildren(
    //         path,
    //         function (event) {
    //             console.log('Got watcher event: %s', event);
    //             listChildren(client, path);
    //         },
    //         function (error, children, stat) {
    //             if (error) {
    //                 console.log(
    //                     'Failed to list children of %s due to: %s.',
    //                     path,
    //                     error
    //                 );
    //                 return;
    //             }

    //             console.log('Children of %s are: %j.', path, children);
    //             zkclient.close();
    //         }
    //     );
    // }

    // zkclient.once('connected', function () {
    //     console.log('Connected to ZooKeeper.');
    //     listChildren(zkclient, zkpath);
    // });

    // zkclient.connect();
});

app.get('/logstash', function handler(req, res) {
    var dummyData = {
        'hp-ezpzpass-views-trip_timestamp_gaps_detected': {
            host: 'elkdocker05-sjc1',
            pipeline: 'ezpzpass'
        },
        'rtsearch-rt-aarhus': {
            host: 'rtlogstash01-sjc1'
        }
    };

    var args = qs.stringify({
        target: [
            'aliasByNode(servers.rtlogstash*.kafka.consumer.ConsumerTopicMetrics.*-BytesPerSec.OneMinuteRate, 1, 5)',
            'aliasByNode(servers.elkdocker*.logstash.*.kafka.consumer.ConsumerTopicMetrics.BytesPerSec.*.*.OneMinuteRate, 1, 3, 8, 9)'
        ],
        from: '-12h',
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
            var resObj = {};
            _.forEach(JSON.parse(body), function onObj(obj, idx) {
                var parts = obj.target.split('.');
                var host = parts[0];
                var topic = parts[3];
                if (_.startsWith(host, 'elkdocker')) {
                    resObj[topic] = {
                        host: host,
                        pipeline: parts[1]
                    };
                } else if (_.startsWith(host, 'rtlogstash')) {
                    // can't separate group and topic here...
                    var groupTopic = parts[1].slice(
                            0, parts[1].length - '-BytesPerSec'.length
                        );
                    resObj[groupTopic] = {
                        host: host
                    };
                } else {
                    console.log(obj);
                }
                return parts;
            });
            res.send(JSON.stringify(resObj));
        }
    });
});

module.exports = app;
