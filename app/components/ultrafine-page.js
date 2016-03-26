// usage page controller
'use strict';

var React = require('react');
var _ = require('lodash');
var UsageStore = require('../stores/usage-store');
var UsageActions = require('../actions/usage-actions');
var Table = require('@uber/react-table/table');
var Button = require('@uber/react-button');
// var r = require('r-dom');

var UltrafinePage = React.createClass({
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
        // toastr.success('refresh data');
    },

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
            </div>
        );
    }
});


module.exports = UltrafinePage;
