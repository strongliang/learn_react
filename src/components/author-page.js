'use strict';

var React = require('react');
// var AuthorApi = require('../mock_api/author-api');
var AuthorList = require('./author-list');
var Link = require('react-router').Link;
// flux way to use author store and action
// var AuthorActions = require('../actions/author-actions');
var AuthorStore = require('../stores/author-store');

// smart component that deals with APIs, as opposed to author-list that just
// does the rendering with data
// the separation keeps the logic compact and the rendering all in one place
var AuthorPage = React.createClass({
    statics: {  // TIP: statics, not static
        willTransitionTo: function(transition, params, query, callback) {
            console.log('welcome to the author page');
            callback();
            // if (!confirm('are you sure? it\'s really boring')) {
            //     transition.abort();
            // } else {
            //     callback();  // make the transition
            // }
        },
        willTransitionFrom: function(transition, component) {
            console.log('you\'re leaving author page');
            // if (!confirm('are you sure? it\'s really exciting')) {
            //     transition.abort();
            // }
        }
    },

    getInitialState: function() {
        return {
            authors: AuthorStore.getAllAuthors()
        };
    },

    render: function() {
        return (
            <div>
                <h1>Authors</h1>
                <Link to='add-author' className='btn btn-default'>Add Author</Link>
                <AuthorList authors={this.state.authors} />
            </div>
        );
    }
});

module.exports = AuthorPage;

