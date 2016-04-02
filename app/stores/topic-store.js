'use strict';

var Dispatcher = require('../dispatcher/app-dispatcher');
var ActionTypes = require('../constants/action-types');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _lag = [{
    type: 'lag-ms',
    group: 'rtsearch',
    kluster: 'kafkab',
    dc: 'sjc1',
    topic: 'xo_api-params-diff',
    'consuming-eps': 0,
    'incoming-eps': 0,
    'lag-ms': 0
}];

var _pipeline = {
    'hp-ezpzpass-views-trip_timestamp_gaps_detected': {
        host: 'elkdocker05-sjc1',
        pipeline: 'ezpzpass'
    },
    'rtsearch-rt-aarhus': {
        host: 'rtlogstash01-sjc1'
    }
};

// take a base object (empty in this case) and glue EE into it
var UsageStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function listener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function listener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function emit() {
        this.emit(CHANGE_EVENT);
    },

    getLagData: function getLagData() {
        return _lag;
    },

    getPipeline: function getPipeline() {
        return _pipeline;
    },

    getData: function getData() {
        _lag.forEach(function each(elem, idx) {
            if (_pipeline[elem.group + '-' + elem.topic]) {
                elem.oldPipe = _pipeline[elem.group + '-' + elem.topic].host;
            }
            if (_pipeline[elem.topic]) {
                elem.newPipe = _pipeline[elem.topic].pipeline;
            }
        });
        return _lag;
    }
});

Dispatcher.register(function dispatch(action) {
    switch (action.actionType) {
    case ActionTypes.GET_LAG_DATA:
        _lag = action.lagData;
        UsageStore.emitChange();
        break;

    case ActionTypes.GET_PIPELINE:
        _pipeline = action.pipeline;
        UsageStore.emitChange();
        break;

    default:
        // no op
    }
});

module.exports = UsageStore;
