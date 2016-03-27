// usage page controller
'use strict';

var React = require('react');
var _ = require('lodash');
var UsageStore = require('../stores/usage-store');
var UsageActions = require('../actions/usage-actions');
var bytes = require('bytes');
var ReactBsTable = require("react-bootstrap-table");
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

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
    },

    render: function() {
        var usage = this.state.usage.diskspace;
        var usageList = _.values(_.mapValues(usage, function map(val, key) {
            return {
                name: key,
                storage: bytes(val),
                raw: val
            };
        }));

        usageList = _(_.sortBy(usageList, function key(obj) {
            return obj.raw;
        })).reverse().value();

        return (
            <div>
                <div>
                    <a href='$' className='btn btn--tiny' onClick={this.getUsage}>refresh</a>
                </div>
                <div>
                    <BootstrapTable className="table table--bordered table--data" data={usageList} striped={true} hover={true} search={true}>
                        <TableHeaderColumn width="300" isKey={true} dataField="name">Index</TableHeaderColumn>
                        <TableHeaderColumn dataField="storage">Storage</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        );
    }
});


module.exports = UsagePage;
