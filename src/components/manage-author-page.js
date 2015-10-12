'use strict';

var React = require('react');
var AuthorForm = require('./author-form');
var AuthorApi = require('../mock_api/author-api');
var Router = require('react-router');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
    mixins: [
        Router.Navigation
    ],

    getInitialState: function() {
        return {
            author: {
                id: '',
                firstName: '',
                lastName: ''
            }
        };
    },

    setAuthorState: function(event) {
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        return this.setState({author: this.state.author});
    },

    saveAuthor: function(event) {
        event.preventDefault();  // disable submit
        console.log(this.state.author);
        AuthorApi.saveAuthor(this.state.author);
        toastr.success('Author saved.');
        this.transitionTo('authors');
    },

    render: function() {
        return (
            <div>
                <AuthorForm
                    author={this.state.author}
                    onChange={this.setAuthorState}
                    onSave={this.saveAuthor}
                    />
            </div>
        );
    }
});


module.exports = ManageAuthorPage;