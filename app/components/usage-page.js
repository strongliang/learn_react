// usage page controller
'use strict';

var React = require('react');
var _ = require('lodash');
var UsageStore = require('../stores/usage-store');
var UsageActions = require('../actions/usage-actions');

var UsagePage = React.createClass({
    getInitialState: function getInitialState() {
        var usage = UsageStore.getUsage();
        console.log('lol', _.keys(usage), _.values(usage));
        return {
            usage: usage
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

    getUsage: function getUsage(event) {
        event.preventDefault();
        UsageActions.getUsage();
        // this.setState({
        //     // usage: UsageStore.getUsage()
        //     usage: UsageStore.getUsage().diskspace
        // });
    },

    render: function() {
        var usage = this.state.usage.diskspace;

        // console.log(this);
        // console.log(this.state);
        console.log(this.state.usage);
        return (
            <div>
                <div>
                    <a href='$' onClick={this.getUsage}>refresh</a>
                </div>
                <table className="table table--bordered table--data">
                <thead>
                    <th>index</th>
                    <th>usage</th>
                </thead>
                <tbody>
                {
                    _.keys(usage).map(function(key, index) {
                        return (
                            <tr key={key}>
                                <td class="one-forth">{key}</td>
                                <td class="one-forth">{usage[key]}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
                </table>
            </div>
        );
    }
});


module.exports = UsagePage;
