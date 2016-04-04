// bootstrapping the app
'use strict';

var Dispatcher = require('../dispatcher/app-dispatcher');
var AuthorApi = require('../api/author-api');
var UsageApi = require('../api/usage-api');
var TopicApi = require('../api/topic-api');
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
                }),
                lagData: TopicApi.getLagData(function onResp(err, data) {
                    if (err) {
                        console.log(err);
                    }
                    Dispatcher.dispatch({
                        actionType: ActionTypes.GET_LAG_DATA,
                        lagData: data
                    });
                }),
                topicMap: TopicApi.getTopicMap(function onResp(err, data) {
                    if (err) {
                        console.log(err);
                    }
                    Dispatcher.dispatch({
                        actionType: ActionTypes.GET_TOPIC_MAP,
                        topicMap: data
                    });
                }),
                pipeline: TopicApi.getPipeline(function onResp(err, data) {
                    if (err) {
                        console.log(err);
                    }
                    Dispatcher.dispatch({
                        actionType: ActionTypes.GET_PIPELINE,
                        pipeline: data
                    });
                })
            }
        });
    }
};

module.exports = InitializeActions;
