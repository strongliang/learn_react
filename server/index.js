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
        'lol': '0'
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
