'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var Router = require('react-router');
var routes = require('./routes');
var InitializeActions = require('./actions/initialize-actions');

InitializeActions.initApp();
// Router.HistoryLocation breaks alot of things. need to figure out how to use it
// Router.run(routes, Router.HistoryLocation, function(Handler) {
Router.run(routes, function(Handler) {
    ReactDom.render(<Handler />, document.getElementById('root'));
});

// module.exports =