'use strict';

var React = require('react');

var Home = React.createClass({
    render: function() {
        // need a plugin to drop X-FRAME-OPTIONS:sameorigin
        var site = 'https://stargate.uberinternal.com/rtsearch_sjc1/elasticsearch/_plugin/kopf/#!/cluster';
        return (
            <div className="text--center giga">
                <iframe src={site} width="1200" height="1200">
                  <p>Your browser does not support iframes.</p>
                </iframe>
            </div>
        );
    }
});


module.exports = Home;