// usage page controller
'use strict';

var React = require('react');
var _ = require('lodash');
var TopicStore = require('../stores/topic-store');
var TopicActions = require('../actions/topic-actions');
var bytes = require('bytes');
var ReactBsTable = require("react-bootstrap-table");
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

var TopicPage = React.createClass({
    getInitialState: function getInitialState() {
        var lag = TopicStore.getData();
        // console.log('lol', _.keys(usage), _.values(usage));
        return {
            lag: lag
        };

    },

    componentWillMount: function() {
        TopicStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TopicStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState({ lag: TopicStore.getData() });
    },

    refreshData: function refreshData(event) {
        event.preventDefault();
        TopicActions.getLagData();
        TopicActions.getPipeline();
    },

    render: function() {
        var lag = this.state.lag;

        return (
            <div>
                <div>
                    <a href='$' className='btn btn--tiny' onClick={this.refreshData}>refresh</a>
                </div>
                <div>
                    <BootstrapTable className="table table--bordered table--data" data={lag} striped={true} hover={true} columnFilter={false} search={true} pagination={false}>
                        <TableHeaderColumn width='200' isKey={true} dataField="topic" filter={{type: "TextFilter", placeholder: "Please enter a value"}}>Topic</TableHeaderColumn>
                        <TableHeaderColumn dataField="incoming-eps" dataSort={true} filter={{type: "NumberFilter", delay: 100}}>Incoming</TableHeaderColumn>
                        <TableHeaderColumn dataField="consuming-eps" dataSort={true} filter={{type: "NumberFilter", delay: 100}}>Consuming</TableHeaderColumn>
                        <TableHeaderColumn dataField="lag-ms" dataSort={true} filter={{type: "NumberFilter", delay: 100}}>Lag</TableHeaderColumn>
                        <TableHeaderColumn dataField="oldPipe" dataSort={true}>Old Pipeline</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField="newPipe" dataSort={true}>New Pipeline</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField="group">Group</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField="kluster">Kluster</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        );
    }
});


module.exports = TopicPage;
