// bootstrapping the app
'use strict';

var Dispatcher = require('../dispatcher/app-dispatcher');
var AuthorApi = require('../mock_api/author-api');
var ActionTypes = require('../constants/action-types');


var InitializeActions = {
    initApp: function() {
        Dispatcher.dispatch({
            actionType: ActionTypes.INITIALIZE,
            initialData: {
                authors: AuthorApi.getAllAuthors()
            }
        });
    }
};

module.exports = InitializeActions;