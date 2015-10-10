'use strict';

var React = require('react');
var Home = require('./components/home-page');
var Main = require('./components/main');
var Authors = require('./components/author-page');

// place holder for the two components
var App = React.createClass({
    render: function() {
        return (
            <div>
                <Home />
                <Main />
                <Authors />
            </div>
        );
    }  // no semicolon here
});

React.render(<App />, document.getElementById('root'));
