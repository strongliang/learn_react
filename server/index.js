'use strict';

var path = require('path');
var express = require('express');
var request = require('request');

var app = express();
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/', function handler(req, res) {
    res.render('test.ejs', {});
}).listen(7777);

var _usage = {
    'diskspace': {
        '__UNUSED__': '177.7 TB',
        'es-generic': '3.2 TB',
        'mobile-experiment': '17.7 TB',
        'es-coreexp': '101.1 GB',
        'fraud': '50.7 GB',
        'es-realtime': '40.8 GB',
        'es-expansion': '2.8 GB',
        'mobile-treatment': '1.1 TB',
        'lucy': '4.4 TB',
        'dibs': '2.6 TB',
        'mobile': '14.5 TB',
        'growth': '283.1 kB',
        'apilogs': '187.8 GB',
        'eslog': '904.7 GB',
        'vault': '113.4 GB',
        'api-migration': '2.3 TB'
    }
};


app.get('/usage', function handler(req, res) {
    request(
        'http://localhost:15005/api/v1/accounting?human',
        function onResp(err, resp, body) {
            if (err || resp.statusCode !== 200) {
                // return callback(err);
                console.log(err);
                res.send(JSON.stringify(_usage));
            } else {
                res.send(body);
            }
        });
});

module.exports = app;
