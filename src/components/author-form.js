'use strict';


var React = require('react');
var Input = require('./text-input');


var AuthorForm = React.createClass({
    render: function() {
        return (
            <form>
                <h1>Manage Author</h1>
                <Input
                    name='firstName'
                    label='First Name'
                    onChange={this.props.onChange}
                    error={this.props.errors.firstName}
                    value={this.props.author.firstName} />

                <Input
                    name='lastName'
                    label='Last Name'
                    onChange={this.props.onChange}
                    error={this.props.errors.lastName}
                    value={this.props.author.lastName} />
                <input
                    type='submit'
                    value='Save'
                    onClick={this.props.onSave}
                    className='btn btn-default' />
            </form>
        );
                    // error={this.props.errors.firstName}
                    // error={this.props.errors.lastName}
    }
});

module.exports = AuthorForm;
