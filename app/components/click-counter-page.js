'use strict';

// Code goes here
var React = require('react');

var Button = React.createClass({

  localHandleClick: function() {
    this.props.localHandleClick(this.props.increment);
  },

  render: function() {
    return (
      <button className="btn push-small" onClick={this.localHandleClick}>+{this.props.increment}</button>
    );
  }
});

var Result = React.createClass({
  render: function() {
    return (
      <div>
        <p className="mega wrapper text--center">{this.props.localCounter}</p>
      </div>
    );
  }
});

var ClickCounterPage = React.createClass({
  getInitialState: function() {
    return {counter: 0};
  },

  handleClick: function(increment) {
    this.setState(
      {counter: this.state.counter + increment}
    );
  },

  render: function() {
    return (
      <div>
        <Button localHandleClick={this.handleClick} increment={1}/>
        <Button localHandleClick={this.handleClick} increment={2}/>
        <Button localHandleClick={this.handleClick} increment={5}/>
        <Button localHandleClick={this.handleClick} increment={10}/>
        <Result localCounter={this.state.counter}/>
      </div>
      );
  }
});

module.exports = ClickCounterPage;
