'use strict';

var Dispatcher = require('../dispatcher/app-dispatcher');
var ActionTypes = require('../constants/action-types');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

// take a base object (empty in this case) and glue EE into it
var AuthorStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    }
});

Dispatcher.register(function(action) {
    // switch(action.actionType) {
        // case
    // }
});

module.exports = AuthorStore;
