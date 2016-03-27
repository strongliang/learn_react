'use strict';

var React = require('react');
var Select = require('@uber/react-select');

var Home = React.createClass({
    getInitialState: function() {
        return {cluster: 'rtsearch_sjc1'};
    },
    handleSelect: function handleSelect(event) {
        console.log(event);
        console.log(event.target.value);
        this.setState({
            cluster: event.target.value
        });
    },
    render: function() {
        // need a plugin to drop X-FRAME-OPTIONS:sameorigin
        var site = 'https://stargate.uberinternal.com/' +
                   this.state.cluster +
                   '/elasticsearch/_plugin/kopf/#!/cluster';
        return (
            <div className="text--center">
                <Select
                    id={'select-cluster'}
                    name={'select-cluster'}
                    label={'Select a State'}
                    onChange={this.handleSelect}
                    value={this.state.cluster}>
                    {[
                        'rtsearch_sjc1',
                        'rtsearchb_sjc1',
                        'rtsearchc_sjc1',
                        'rtsearchd_sjc1',
                        'rtsearche_sjc1',
                        'rtsearchf_sjc1'
                    ]}
                </Select>
                <iframe src={site} width="1200" height="1200">
                  <p>Your browser does not support iframes.</p>
                </iframe>
            </div>
        );
    }
});


module.exports = Home;