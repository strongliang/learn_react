// usage page controller
'use strict';

var React = require('react');
var _ = require('lodash');
var UsageStore = require('../stores/usage-store');
var UsageActions = require('../actions/usage-actions');
var Table = require('@uber/react-table/table');
var Button = require('@uber/react-button');
// var r = require('r-dom');
var ReactBsTable = require("react-bootstrap-table");
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
var Modal = require('@uber/react-modal/modal');
var ModalDialog = require('@uber/react-modal/modal-dialog');

// products will be presented by ReactBsTable
var products = [
  {
      id: 1,
      name: "Product1",
      price: 120
  }, {
      id: 2,
      name: "Product2",
      price: 80
  }, {
      id: 3,
      name: "Product3",
      price: 207
  }, {
      id: 4,
      name: "Product4",
      price: 100
  }, {
      id: 5,
      name: "Product5",
      price: 150
  }, {
      id: 6,
      name: "Product1",
      price: 160
  }
];

var UltrafinePage = React.createClass({
    getInitialState: function getInitialState() {
        var usage = UsageStore.getUsage();
        console.log('lol', _.keys(usage), _.values(usage));
        return {
            usage: usage,
            isVisible: false
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
        // toastr.success('refresh data');
    },
    openModal: function() {this.setState({ isVisible: true }); },
    closeModal: function() {this.setState({ isVisible: false }); },
    render: function() {
        var usage = this.state.usage.diskspace;

        return (
            <div>
                <Table isBordered={true}>
                  <tbody>
                    <tr>
                      <td>
                        <a href={''}>{'Link Item'}</a>
                      </td>
                      <td>Item</td>
                      <td>Item</td>
                      <td>Item</td>
                      <td className='numerical'>0.00</td>
                    </tr>
                    <tr>
                      <td>
                        <a href={''}>{'Link Item'}</a>
                      </td>
                      <td>Item</td>
                      <td>Item</td>
                      <td>Item</td>
                      <td className='numerical'>0.00</td>
                    </tr>
                    <tr>
                      <td>
                        <a href={''}>{'Link Item'}</a>
                      </td>
                      <td>Item</td>
                      <td>Item</td>
                      <td>Item</td>
                      <td className='numerical'>0.00</td>
                    </tr>
                  </tbody>
                </Table>

                <Button className={'push-tiny--right'} kind='primary'>Primary</Button>
                <Button className={'push-tiny--right'} kind='primary' isArrow={true}>{'Primary with Arrow'}</Button>
                <Button kind='primary' isInactive={true}>{'Primary Disabled'}</Button>

                <p>
                    <Button
                        className={'push-tiny--right'}
                        isLoading={true} preloaderType='negative'
                        aria-label='Wait'></Button>
                    <Button
                        className={'push-tiny--right'} kind='secondary'
                        isLoading={true}
                        preloaderType={''}
                        isInactive={true}></Button>
                    <Button isLoading={true} preloaderType='gray' isInactive={true}></Button>
                </p>

                <div className={'soft-small--bottom'}>
                  <Button kind='primary' onClick={this.openModal}>Modal</Button>
                  <Modal isOpen={this.state.isVisible} close={this.closeModal}>
                    <div>{'Modal content goes here'}</div>
                    <div>
                        <BootstrapTable data={products} striped={true} hover={true} search={true}>
                            <TableHeaderColumn isKey={true} dataField="id" dataSort={true}>Product ID</TableHeaderColumn>
                            <TableHeaderColumn dataField="name" dataSort={true}>Product Name</TableHeaderColumn>
                            <TableHeaderColumn dataField="price" dataSort={true}>Product Price</TableHeaderColumn>
                            <TableHeaderColumn dataField="price" dataSort={true}>Product Price</TableHeaderColumn>
                            <TableHeaderColumn dataField="price" dataSort={true}>Product Price</TableHeaderColumn>
                            <TableHeaderColumn dataField="price" dataSort={true}>Product Price</TableHeaderColumn>
                            <TableHeaderColumn dataField="price" dataSort={true}>Product Price</TableHeaderColumn>
                            <TableHeaderColumn dataField="price" dataSort={true}>Product Price</TableHeaderColumn>
                            <TableHeaderColumn dataField="price" dataSort={true}>Product Price</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                    <div className={'text--center soft--top'}></div>
                  </Modal>
                </div>
            </div>
        );
    }
});


module.exports = UltrafinePage;
