'use strict';

var Dispatcher = require('../dispatcher/app-dispatcher');
var AuthorApi = require('../mock_api/author-api');
var ActionTypes = require('../constants/action-types');

var AuthorActions = {
    createAuthor: function(author) {
        // in real world, this would be async.
        var newAuthor = AuthorApi.saveAuthor(author);

        // hey dispatcher, go tell all the stores that an author was just created.
        Dispatcher.dispatch({
            actionType: ActionTypes.CREATE_AUTHOR,
            author: newAuthor
        });
    }
};

module.exports = AuthorActions;
