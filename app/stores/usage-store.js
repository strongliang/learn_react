'use strict';

var Dispatcher = require('../dispatcher/app-dispatcher');
var ActionTypes = require('../constants/action-types');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
// var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _usage = {
    'diskspace': {
        '__UNUSED__': '177.7 TB',
        'es-generic': '3.2 TB',
        'mobile-experiment': '17.7 TB',
        'es-coreexp': '101.1 GB',
        'fraud': '50.7 GB',
        'es-realtime': '40.8 GB',
        'es-expansion': '2.8 GB',
        'mobile-treatment': '1.1 TB',
        'lucy': '4.4 TB',
        'dibs': '2.6 TB',
        'mobile': '14.5 TB',
        'growth': '283.1 kB',
        'apilogs': '187.8 GB',
        'eslog': '904.7 GB',
        'vault': '113.4 GB',
        'api-migration': '2.3 TB'
    }
};

// take a base object (empty in this case) and glue EE into it
var UsageStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    getUsage: function getUsage() {
        return _usage;
    }
    // getAllAuthors: function() {
    //     return _authors;
    // },

    // getAuthorById: function(id) {
    //     return _.find(_authors, {id: id});
    // }
});

Dispatcher.register(function dispatch(action) {
    switch (action.actionType) {
        // case ActionTypes.INITIALIZE:
        //     _usage = action.initialData.usage;
        //     UsageStore.emitChange();
        //     break;
        case ActionTypes.GET_USAGE:
            _usage = action.usage;
            UsageStore.emitChange();
            break;

        // case ActionTypes.CREATE_AUTHOR:
        //     _authors.push(action.author);
        //     UsageStore.emitChange();
        //     break;

        // case ActionTypes.DELETE_AUTHOR:
        //     var deleteAuthor = _.find(_authors, {id: action.author.id});
        //     var deleteAuthorIndex = _.indexOf(_authors, deleteAuthor);
        //     _authors.splice(deleteAuthorIndex, 1);
        //     UsageStore.emitChange();
        //     break;

        // case ActionTypes.UPDATE_AUTHOR:
        //     // var existingAuthor = _.find(_authors, {id: action.author.id});
        //     // var existingAuthorIndex = _.indexOf(_authors, existingAuthor);
        //     // _authors.splice(existingAuthorIndex, 1, action.author);

        //     // one line is better than three above
        //     _.remove(_authors, function(author) {
        //         return action.id === author.id;
        //     });
        //     UsageStore.emitChange();
        //     break;

        default:
            // no op
    }
});

module.exports = UsageStore;
