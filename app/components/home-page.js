'use strict';

var React = require('react');
var Select = require('@uber/react-select');
var Tabs = require('@uber/react-tabs/tabs');
var TabsButtons = require('@uber/react-tabs/tabs-buttons');
var StatefulTabs = require('@uber/react-tabs/stateful-tabs');
var TabsPanel = require('@uber/react-tabs/tabs-panels');

var Home = React.createClass({
    render: function() {
        return (
            <div>
              <StatefulTabs activeItem={0}>
                <Tabs isDark={false}>
                  <a>{'Tab Item 1'}</a>
                  <a>{'Tab Item 2'}</a>
                  <a>{'Tab Item 3'}</a>
                </Tabs>
                <TabsPanel>
                  <div><Kopf /></div>
                  <div><Kopf /></div>
                  <div><Kopf /></div>
                </TabsPanel>
              </StatefulTabs>
            </div>
        );
    }
});
var Kopf = React.createClass({
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
                // <Select id={'select-cluster'} name={'select-cluster'} label={'Select an Cluster'}>
                //   <optgroup label='sjc1'>
                //     <option value={'colonel-meow'}>{'Colonel Meow'}</option>
                //     <option value={'grumpy-cat'}>{'Grumpy Cat'}</option>
                //     <option value={'long-cat'}>{'Long Cat'}</option>
                //   </optgroup>
                //   <optgroup label='dca1'>
                //     <option value='boo'>Boo</option>
                //     <option value={'carl-the-pug'}>{'Carl the Pug'}</option>
                //     <option value={'maru-taro'}>{'Maru Taro'}</option>
                //   </optgroup>
                //   <optgroup label='pek1' disabled={false}>
                //     <option value={'deal-with-it'}>{'Deal With It'}</option>
                //     <option value={'i-believe-i-can-fly'}>{'I Believe I Can Fly'}</option>
                //   </optgroup>
                // </Select>
    }
});


module.exports = Home;