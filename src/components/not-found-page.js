'use strict';

var React = require('React');
var Router = require('react-router');
var Link = Router.Link;

var NotFoundPage = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Page Not Found</h1>
                <p><a href='#'>Back to Home</a></p>
            </div>
        );
                //FIXME: cannot put this link here, not sure why
                // <p><Link to='app'>Back to Home</Link></p>
                // the old way still works here
                // <p><a href='#'>Back to Home</a></p>
                // what's more: the same link works
    }
});

module.exports = NotFoundPage;