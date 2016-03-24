'use strict';

var path = require('path');
var express = require('express');

var app = express();
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/', function handler(req, res) {
    res.render('test.ejs', {});
}) .listen(7777);

module.exports = app;
