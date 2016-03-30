'use strict';

var React = require('react');
// var AuthorApi = require('../api/author-api');
var AuthorList = require('./author-list');
var Link = require('react-router').Link;
// flux way to use author store and action
// var AuthorActions = require('../actions/author-actions');
var AuthorStore = require('../stores/author-store');
var AuthorActions = require('../actions/author-actions');
var ActionTypes = require('../constants/action-types');
var toastr = require('toastr');

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

    componentWillMount: function() {
        AuthorStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        AuthorStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState({ authors: AuthorStore.getAllAuthors() });
    },

    deleteAuthor: function(id, event) {
        event.preventDefault();  // prevent the link from being clicked
        AuthorActions.deleteAuthor(id);
        toastr.success('Author Deleted');
    },

    render: function() {
        return (
            <div>
                <h1>Authors</h1>
                <Link to='add-author' className='btn btn--tiny'>Add Author</Link>
                <AuthorList
                    authors={this.state.authors}
                    deleteAuthor={this.deleteAuthor}
                     />
            </div>
        );
    }
});

module.exports = AuthorPage;

