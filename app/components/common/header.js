'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({
    render: function() {
        return (
            <nav className='top-bar top-bar--dark'>
                <div className='container-fluid'>
                    <ul className='nav navbar-nav'>
                        <li><Link to='app'>Home</Link></li>
                        <li><Link to='usage'>Usage</Link></li>
                        <li><Link to='topic'>Topic</Link></li>
                        <li><Link to='ultrafine'>Ultrafine</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
                        // <li><Link to='authors'>Authors</Link></li>
                        // <li><Link to='click-counter'>Click-Counter</Link></li>
});

module.exports = Header;