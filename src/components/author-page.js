'use strict';

var React = require('react');
var AuthorApi = require('../mock_api/author-api');
var AuthorList = require('./author-list');

// smart component that deals with APIs, as opposed to author-list that just
// does the rendering with data
// the separation keeps the logic compact and the rendering all in one place
var AuthorPage = React.createClass({
    statics: {  // TIP: statics, not static
        willTransitionTo: function(transition, params, query, callback) {
            if (!confirm('are you sure? it\'s really boring')) {
                transition.abort();
            } else {
                callback();  // make the transition
            }
        },
        willTransitionFrom: function(transition, component) {
            if (!confirm('are you sure? it\'s really exciting')) {
                transition.abort();
            }
        }
    },

    getInitialState: function() {
        return {
            authors: []
        };
    },

    componentDidMount: function() {
        if (this.isMounted()) { // double check
            // pulls data from API.
            this.setState({ authors: AuthorApi.getAllAuthors() });
        }
    },

    render: function() {
        return (
            <div>
                <AuthorList authors={this.state.authors} />
            </div>
        );
    }
});

module.exports = AuthorPage;

