sensable-reporter
=================

A simple library to report data via node to sensable.io

See the [examples](https://github.com/chrkaatz/sensable-reporter/blob/master/examples/README.md) for a quickstart.

usage
-----

    var sensableReporter = require("sensable-reporter");
    // the second general settings object have to contain your accessToken
    var tmpReporter = sensableReporter({
            sensorid: "FooSensor",
            unit: "°c",
            sensortype: "temperature",
            latitude: "10.0",
            longitude: "5.0",
            name: "readble name for foo-sensor"
        }, {
            accessToken: "xyz-lshfosn",  //this token needs to be retrieved from sensable.io
            private: false
        });
    var celsius = 32;
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
