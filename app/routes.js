'use strict';

var React = require('react');
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;
var Route = Router.Route;

var routes = (
    <Route name='app' path='/' handler={require('./components/app')}>
        <DefaultRoute handler={require('./components/home-page')} />
        <Route name='click-counter' path='click' handler={require('./components/click-counter-page')} />
        <Route name='authors' path='authors' handler={require('./components/author-page')} />
        <Route name='usage' path='usage' handler={require('./components/usage-page')} />
        <Route name='topic' path='topic' handler={require('./components/topic-page')} />
        <Route name='ultrafine' path='ultrafine' handler={require('./components/ultrafine-page')} />
        <Route name='add-author' path='add-author' handler={require('./components/manage-author-page')} />
        <Route name='edit-author' path='author/:id' handler={require('./components/manage-author-page')} />
        <NotFoundRoute handler={require('./components/not-found-page')} />
        <Redirect from='author-detail' to='authors'/>
        <Redirect from='author/*' to='authors'/>
    </Route>
);

module.exports = routes;
