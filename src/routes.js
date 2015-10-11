'use strict';

var React = require('react');
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Route = Router.Route;

var routes = (
    <Route name='app' path='/' handler={require('./components/app')}>
        <DefaultRoute handler={require('./components/home-page')} />
        <Route name='click-counter' handler={require('./components/click-counter-page')} />
        <Route name='authors' handler={require('./components/author-page')} />
        <NotFoundRoute handler={require('./components/not-found-page')} />
    </Route>
);

module.exports = routes;
