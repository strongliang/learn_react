'use strict';

var Dispatcher = require('../dispatcher/app-dispatcher');
var ActionTypes = require('../constants/action-types');
var topicApi = require('../api/topic-api');

var TopicActions = {
    getLagData: function getLagData() {
        topicApi.getLagData(function onResp(err, data) {
            if (err) {
                console.log(err);
            }
            console.log('lag:', data);
            Dispatcher.dispatch({
                actionType: ActionTypes.GET_LAG_DATA,
                lagData: data
            });
        });
    },
    getTopicMap: function getTopicMap() {
        topicApi.getTopicMap(function onResp(err, data) {
            if (err) {
                console.log(err);
            }
            console.log('topicMap:', data);
            Dispatcher.dispatch({
                actionType: ActionTypes.GET_TOPIC_MAP,
                topicMap: data
            });
        });
    },
    getPipeline: function getPipeline() {
        topicApi.getPipeline(function onResp(err, data) {
            if (err) {
                console.log(err);
            }
            console.log('pipeline', data);
            Dispatcher.dispatch({
                actionType: ActionTypes.GET_PIPELINE,
                pipeline: data
            });
        });
    }
};

module.exports = TopicActions;
