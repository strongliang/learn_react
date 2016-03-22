'use strict';

var path = require('path');
var express = require('express');

var app = express();
app.set('views', path.join(__dirname, './'));

app.get('/', function handler(req, res) {
    res.render('test.ejs', {});
}) .listen(7777);
