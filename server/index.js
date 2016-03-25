'use strict';

var path = require('path');
var express = require('express');
var request = require('request');

var app = express();
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/', function handler(req, res) {
    res.render('test.ejs', {});
}).listen(7777);

app.get('/usage', function handler(req, res) {
    // request(
    //     'http://localhost:15005/api/v1/accounting',
    //     function onResp(err, resp, body) {
    //         if (err || resp.statusCode !== 200) {
    //             // return callback(err);
    //             console.log(err);
    //         }
    //         // console.log(body);
    //         res.send(body);
    //     });
    res.send({
        a: 1,
        b: 2
    });
});

module.exports = app;
