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
var Modal = require('@uber/react-modal/modal');
var ModalDialog = require('@uber/react-modal/modal-dialog');

var TopicPage = React.createClass({
    getInitialState: function getInitialState() {
        var lag = TopicStore.getData();
        // console.log('lol', _.keys(usage), _.values(usage));
        return {
            lag: lag,
            isVisible: false
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
        // var fakeRow = {
        //     type: 'lag-ms',
        //     group: 'rtsearch',
        //     kluster: 'kafkab',
        //     topic: 'aaa',
        //     'consuming-eps': 0,
        //     'incoming-eps': 0,
        //     'lag-ms': 0
        // };
        // // insert a new row
        // var result = this.refs.table.handleAddRow(fakeRow);
        // if(result){  //some error happen, ex: doesn't assign row key or row key duplicated
        //       console.log(result);
        // }
    },
    onRowClick: function onRowClick(row) {
        console.log('you just clicked on row', row);
        this.setState({
            isVisible: true
        });
    },
    closeModal: function closeModal() {
        this.setState({
            isVisible: false
        });
    },
    render: function() {
        function onRowSelect(row, isSelected){
          console.log(row);
          console.log("selected: " + isSelected);
        }

        function onSelectAll(isSelected){
          console.log("is select all: " + isSelected);
        }
        var selectRowProp = {
          mode: "checkbox",
          clickToSelect: false,
          bgColor: "rgb(238, 193, 213)",
          onSelect: onRowSelect,
          onSelectAll: onSelectAll
        };

        var options = {
            onRowClick: this.onRowClick
        };

        var lag = this.state.lag;

          // <Button kind='primary' onClick={() => this.setState({ isVisible: true })}>Modal</Button>
        return (
            <div>
                <div>
                    <a href='$' className='btn' onClick={this.refreshData}>refresh</a>
                </div>
                <div className={'soft-huge--bottom'}>
                    <Modal isOpen={this.state.isVisible} close={this.closeModal}>
                        <div>{'Modal content goes here'}</div>
                        <div className={'text--center soft--top'}></div>
                    </Modal>
                </div>
                <div>
                    <BootstrapTable className="table table--bordered table--data" data={lag} selectRow={selectRowProp}
                                    striped={true} hover={true} columnFilter={false} search={true} pagination={false}
                                    options={options} condensed={true} exportCSV={false}>
                        <TableHeaderColumn width='200' isKey={true} dataField="topic" filter={{type: "TextFilter", placeholder: ""}}>
                            Topic</TableHeaderColumn>
                        <TableHeaderColumn dataField="incoming-eps" dataSort={true} filter={{type: "NumberFilter", delay: 100}}>
                            Incoming</TableHeaderColumn>
                        <TableHeaderColumn dataField="consuming-eps" dataSort={true} filter={{type: "NumberFilter", delay: 100}}>
                            Consuming</TableHeaderColumn>
                        <TableHeaderColumn dataField="lag-ms" dataSort={true} filter={{type: "NumberFilter", delay: 100}}>
                            Lag</TableHeaderColumn>
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
