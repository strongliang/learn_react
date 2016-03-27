'use strict';

var Dispatcher = require('../dispatcher/app-dispatcher');
var ActionTypes = require('../constants/action-types');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
// var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _usage = {
    'diskspace': {
        __TOTAL__: 166496058094454,
        uspout: 1068020757477,
        populous: 49164300147,
        opsless: 815627,
        m3: 42949688267
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
