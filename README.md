sensable-reporter
=================

A simple library to report data via node to sensable.io

See the [examples](https://github.com/chrkaatz/sensable-reporter/blob/master/examples/README.md) for a quickstart.

usage
-----

    var sensableReporter = require("sensable-reporter");
    // the second general settings object is only needed if you want
    // to connect your sensable with your account
    var tmpReporter = sensableReporter({
            sensorid: "foo-sensor",
            unit: "°c",
            sensortype: "temperature",
            latitude: "10.0",
            longitude: "5.0"
        }, {
            userid: "xyz",
            private: true
        });
    var celsius = 31.1234;
    tempReporter.upload(
        parseFloat(celsius.toFixed(1)),
        (+new Date()),
        function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("posted the data");
            }
        }
    );
