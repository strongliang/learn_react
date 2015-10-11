// highest level component
'use strict';

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

// place holder for the two components
var App = React.createClass({
    render: function() {
        return (
            <div className='container-fluid'>
                <RouteHandler />
            </div>
        );
    }  // no semicolon here
});

module.exports = App;