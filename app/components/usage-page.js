'use strict';
// controller

var React = require('react');
var UsageStore = require('../stores/usage-store');

var UsagePage = React.createClass({
    getInitialState: function getInitialState() {
        return {
            usage: UsageStore.getUsage()
        };

    },

    componentWillMount: function() {
        UsageStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        UsageStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState({ usage: UsageStore.getUsage() });
    },

    getUsage: function getUsage() {
        this.setState({
            usage: UsageStore.getUsage()
        });
    },

    render: function() {
        return (
            <div>
                <p>{this.state.usage}</p>
            </div>
        );
                // <p><a href='$' onClick={this.state.getUsage.bind(this)}>get</a></p>
    }
});


module.exports = UsagePage;
