'use strict';

var React = require('react');
var Home = require('./components/home-page');
var Main = require('./components/main');

var App = React.createClass({
    render: function() {
        return (
            <div>
                <Home />
                <Main />
            </div>
        );
    }  // no semicolon here
});

React.render(<App />, document.getElementById('root'));
