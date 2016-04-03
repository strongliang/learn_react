// usage page controller
'use strict';

var bytes = require('bytes');
var request = require('request');
var React = require('react');
var _ = require('lodash');
var TopicStore = require('../stores/topic-store');
var TopicActions = require('../actions/topic-actions');
var ReactBsTable = require("react-bootstrap-table");
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
var Modal = require('@uber/react-modal/modal');
var ModalDialog = require('@uber/react-modal/modal-dialog');
var Layout = require('@uber/react-layout/layout');
var LayoutItem = require('@uber/react-layout/layout-item');
var TextInput = require('@uber/react-text-input');
var Button = require('@uber/react-button');

var TopicPage = React.createClass({
    getInitialState: function getInitialState() {
        var lag = TopicStore.getData();
        return {
            lag: lag,
            isVisible: false,
            row: {
                topic: 'foo bar'
            },
            offset: ''
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
    getOffset: function getOffset(topic) {
        var self = this;
        request({
            uri: 'http://localhost:7777/offset?topic=geobase'
        }, function onResp(err, resp, body) {
            console.log(err, resp, body);
            self.setState({
                offset: body
            });
        });
    },
    onRowClick: function onRowClick(row) {
        console.log('you just clicked on row', row);
        this.getOffset();
        this.setState({
            isVisible: true,
            row: row
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

        function numberFormatter(cell, row) {
            return Math.round(cell);
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
                      // <LayoutItem size='oneHalf' palm='oneWhole'>
                      //   <TextInput label={'First Name'} placeholder='Jane' id={'first-name'}></TextInput>
                      // </LayoutItem>
                      // <LayoutItem size='oneHalf' palm='oneWhole'>
                      //   <TextInput label={'Last Name'} placeholder='Doe' id={'last-name'}></TextInput>
                      // </LayoutItem>
                // <div className={'soft-huge--bottom'}>
        return (
            <div>
                <div>
                    <a href='$' className='btn' onClick={this.refreshData}>refresh</a>
                </div>
                <div>
                    <ModalDialog isOpen={this.state.isVisible} close={this.closeModal}>
                        <p className='zeta'>{this.state.row.topic}</p>
                        <Layout>
                            <LayoutItem size='oneWhole'>
                                <TextInput label='BlackholeAmount' placeholder={'10%'} id='blackholeAmount'></TextInput>
                                <pre>{this.state.offset}</pre>
                            </LayoutItem>
                        </Layout>
                        <Button className={'push-small--top'} kind='primary' isFull={true}>Start Black Hole</Button>
                    </ModalDialog>
                </div>
                <div>
                    <BootstrapTable className="table table--bordered table--data" data={lag} selectRow={selectRowProp}
                                    striped={true} hover={true} columnFilter={false} search={true} pagination={false}
                                    options={options} condensed={true} exportCSV={false}>

                        <TableHeaderColumn width='200' isKey={true} dataField="topic"
                                           filter={{type: "TextFilter", placeholder: ""}}>Topic</TableHeaderColumn>

                        <TableHeaderColumn dataField="incoming-eps" dataSort={true} dataFormat={numberFormatter}
                                           filter={{type: "NumberFilter", delay: 100}}>Incoming</TableHeaderColumn>

                        <TableHeaderColumn dataField="consuming-eps" dataSort={true} dataFormat={numberFormatter}
                                           filter={{type: "NumberFilter", delay: 100}}>Consuming</TableHeaderColumn>

                        <TableHeaderColumn dataField="lag-ms" dataSort={true} dataFormat={numberFormatter}
                                           filter={{type: "NumberFilter", delay: 100}}>Lag</TableHeaderColumn>

                        <TableHeaderColumn width='150' dataField="oldPipe" dataSort={true}>Old Pipeline</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField="newPipe" dataSort={true}>New Pipeline</TableHeaderColumn>
                        <TableHeaderColumn width='200' dataField="group">Group</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField="kluster">Kluster</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField="dc">Datacenter</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        );
    }
});


module.exports = TopicPage;
