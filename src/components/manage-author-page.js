'use strict';

var React = require('react');
var AuthorForm = require('./author-form');
// var AuthorApi = require('../mock_api/author-api');  // direct API call
var Router = require('react-router');
var toastr = require('toastr');
// flux way to use author store and action
var AuthorActions = require('../actions/author-actions');
var AuthorStore = require('../stores/author-store');

var ManageAuthorPage = React.createClass({
    mixins: [
        Router.Navigation
    ],

    statics: {
        willTransitionFrom: function(transition, component) {
            if (component.state.dirty && !confirm('leave without saving?')) {
                transition.abort();
            }
        }
    },

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

    componentWillMount: function() {
        var authorId = this.props.params.id;  // get the id in the url
        if (authorId) {
            this.setState({author: AuthorStore.getAuthorById(authorId)});
        }
    },

    setAuthorState: function(event) {
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        this.state.dirty = true;
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
        this.state.dirty = false;
        if (!this.authorFormIsValid()) {
            return;
        }
        if (this.state.author.id) {
            AuthorActions.updateAuthor(this.state.author);
        } else {
            AuthorActions.createAuthor(this.state.author);  // using the store
        }
        // AuthorApi.saveAuthor(this.state.author);  // direct API call
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