// bootstrapping the app
'use strict';

var Dispatcher = require('../dispatcher/app-dispatcher');
var AuthorApi = require('../api/author-api');
var UsageApi = require('../api/usage-api');
var ActionTypes = require('../constants/action-types');

var InitializeActions = {
    initApp: function initApp() {
        Dispatcher.dispatch({
            actionType: ActionTypes.INITIALIZE,
            initialData: {
                authors: AuthorApi.getAllAuthors(),
                // can't do it like this since it's not sync
                // usage: UsageApi.getUsage()
                usage: UsageApi.getUsage(function onResp(err, data) {
                    if (err) {
                        console.log(err);
                    }
                    Dispatcher.dispatch({
                        actionType: ActionTypes.GET_USAGE,
                        usage: data
                    });
                })
            }
        });
    }
};

module.exports = InitializeActions;
