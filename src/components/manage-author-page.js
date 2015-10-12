'use strict';

var React = require('react');
var AuthorForm = require('./author-form');

var ManageAuthorPage = React.createClass({
    getInitialState: function() {
        return {
            author: {
                id: 'foo-bar',
                firstName: 'foo',
                lastName: 'bar'
            }
        };
    },

    setAuthorState: function(event) {
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        return this.setState({author: this.state.author});
    },

    render: function() {
        return (
            <div>
                <AuthorForm
                    author={this.state.author}
                    onChange={this.setAuthorState}
                    />
            </div>
        );
    }
});


module.exports = ManageAuthorPage;