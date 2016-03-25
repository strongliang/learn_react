// usage page controller
'use strict';

var React = require('react');
var _ = require('lodash');
var UsageStore = require('../stores/usage-store');

var UsagePage = React.createClass({
    getInitialState: function getInitialState() {
        // console.log(UsageStore.getUsage());
        // console.log('lol', _.keys(UsageStore.getUsage()));
        var usage = UsageStore.getUsage();
        console.log('lol', _.keys(usage), _.values(usage));
        return {
            usage: usage
            // usage: usage
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
        // this.setState({ usage: {1: 2} });
    },

    // getUsage: function getUsage() {
    //     this.setState({
    //         // usage: UsageStore.getUsage()
    //         usage: _.keys(UsageStore.getUsage())
    //     });
    // },

    render: function() {
        var usage = this.state.usage.diskspace;

        // console.log(this);
        // console.log(this.state);
        console.log(this.state.usage);
        return (
            <div>
                <table className="table--bordered table--data">
                <thead>
                    <th class="one-tenth">index</th>
                    <th class="one-sixth">usage</th>
                </thead>
                <tbody>
                {
                    _.keys(usage).map(function(key, index) {
                        return (
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{usage[key]}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
                </table>
            </div>
        );
                // <p><a href='$' onClick={this.state.getUsage.bind(this)}>get</a></p>
    }
});


module.exports = UsagePage;
