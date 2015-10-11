'use strict';

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

// Router.HistoryLocation breaks alot of things. need to figure out how to use it
// Router.run(routes, Router.HistoryLocation, function(Handler) {
Router.run(routes, function(Handler) {
    React.render(<Handler />, document.getElementById('root'));
});

