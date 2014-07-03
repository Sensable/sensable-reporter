var requestLib = require("request");

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
    var uri = "http://sensable.io/sensable";
    return {
        /**
            upload data to sensable.io

            @param data numeric value
            @param timestamp timestamp when the event occured
            @param (state) optional string containing a state
            @param callback function(err, response, body)

        */
        upload: function(data, timestamp, state, callback) {
            var postBody = {
                "sensorid": sensorProperties.sensorid,
                "unit": sensorProperties.unit,
                "sensortype": sensorProperties.sensortype,
                "location": [
                    sensorProperties.latitude,
                    sensorProperties.longitude
                ],
                "sample": {}
            };

            if(arguments.length === 3 && typeof state === "function") {
                callback = state;
                postBody.sample.timestamp = timestamp;
                postBody.sample.value = data;
            } else {
                postBody.sample.state = state;
            }

            if(settings && settings.accessToken) {
                postBody.accessToken = settings.accessToken;
                if(settings && settings.private) {
                    postBody.private = true;
                }
            } else {
                return new Error("missing accessToken");
            }

            requestLib({
                method: "POST",
                url: uri,
                json: true,
                body: postBody
            }, callback);
        }
    };
};
