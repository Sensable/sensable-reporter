var requestLib = require("request");
var sensorExists = false;
var postBody = {
    sample: {}
};
var sensorId = "";
var host = "http://sensable.io";


/**
    initialize this like

    var sensableReporter = require("sensable-reporter");
    // the second general settings object is only needed if you want
    // to connect your sensable with your account
    //
    // Important, create an account at sensable.io and create yourself
    // an accessToken by hovering over your username after you logged and
    // click on "Show account info", where you can create your accessToken
    var tmpReporter = sensableReporter({
            sensorid: "foo-sensor",
            name: "my sensor in the room behind me",
            unit: "°c",
            sensortype: "temperature",
            latitude: "10.0",
            longitude: "5.0"
        }, {
            accessToken: "<put your accessToken here>"
        })
*/
module.exports = function(sensorProperties, settings) {
    "use strict";
    var uri = host + "/sensable";
    var initialPostBody = {
        "sensorid": sensorProperties.sensorid,
        "unit": sensorProperties.unit,
        "sensortype": sensorProperties.sensortype,
        "location": [
            sensorProperties.longitude,
            sensorProperties.latitude
        ],
        "sample": {}
    };
    return {
        /**
            upload data to sensable.io

            @param data numeric value
            @param timestamp timestamp when the event occured
            @param (state) optional string containing a state
            @param callback function(err, response, body)

        */
        upload: function(data, timestamp, state, callback) {
            if(sensorExists) {
                postBody = {
                    sample: {}
                };
                uri = host + "/sensed/" + sensorId;
            } else {
                postBody = initialPostBody;
                if(sensorProperties.name) {
                    postBody.name = sensorProperties.name;
                }
                if(settings && settings.accessToken && settings.private) {
                    postBody.private = true;
                }
            }
            if(arguments.length === 3 && typeof state === "function") {
                callback = state;
                postBody.sample.timestamp = timestamp;
                postBody.sample.value = data;
            } else {
                postBody.sample.state = state;
            }

            if(settings && settings.accessToken) {
                postBody.accessToken = settings.accessToken;
            } else {
                return new Error("missing accessToken");
            }

            requestLib({
                method: "POST",
                url: uri,
                json: true,
                body: postBody
            }, function(err, response, body) {
                if(err) {
                    return callback(err);
                }
                if(response.statusCode === 400 &&
                    body && 
                    body.hasOwnProperty("message") &&
                    body.message === "sensor exists" &&
                    body.hasOwnProperty("sensorid")) 
                {
                    sensorExists = true;
                    sensorId = body.sensorid;
                    callback(err, response, body);
                } else if(response.statusCode === 201 && body && body.hasOwnProperty("sensorid")) {
                    sensorExists = true;
                    sensorId = body.sensorid;
                    callback(err, response, body);
                } else if(response.statusCode === 200 && sensorExists) {
                    callback(err, response, body);
                } else {
                    callback(new Error("something went wrong"), response, body);
                }
            });
        }
    };
};
