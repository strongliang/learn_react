'use strict';

var Dispatcher = require('../dispatcher/app-dispatcher');
var ActionTypes = require('../constants/action-types');
var usageApi = require('../api/usage-api');

var AuthorActions = {
    getUsage: function getUsage() {
        usageApi.getUsage(function onResp(err, data) {
            if (err) {
                console.log(err);
            }
            console.log('action usage', data);
            Dispatcher.dispatch({
                actionType: ActionTypes.GET_USAGE,
                usage: data
            });
        });
    }
};

module.exports = AuthorActions;
