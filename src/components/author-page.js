'use strict';

var React = require('react');
var AuthorApi = require('../mock_api/author-api');

var Authors = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Authors</h1>
            </div>
        );
    }
});

module.exports = Authors;

