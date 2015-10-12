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
            },
            errors: {}
        };
    },

    setAuthorState: function(event) {
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        return this.setState({author: this.state.author});
    },

    authorFormIsValid: function() {
        var formIsValid = true;
        this.state.errors = {};  // clear any previous errors

        if (this.state.author.firstName.length < 3) {
            this.state.errors.firstName = 'first name must be at least 3 chars';
            formIsValid = false;
        }

        if (this.state.author.lastName.length < 3) {
            this.state.errors.lastName = 'last name must be at least 3 chars';
            formIsValid = false;
        }

        this.setState({errors: this.state.errors});
        return formIsValid;

    },

    saveAuthor: function(event) {
        event.preventDefault();  // disable submit
        if (!this.authorFormIsValid()) {
            return;
        }
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
                    errors={this.state.errors}
                    onSave={this.saveAuthor}
                    />
            </div>
        );
    }
});


module.exports = ManageAuthorPage;