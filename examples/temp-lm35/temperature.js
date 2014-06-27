var five = require("johnny-five");
var board = new five.Board();
var pollFrequency = (60 * 60 * 1000); // every hour
var sensableReporter = require("sensable-reporter");
var tempReporter = sensableReporter({
    sensorid: "my-kilimanjaro-lm35-sensor",
    unit: "°c",
    type: "temperature",
    latitude: -3.0758149613047263,
    longitude: 37.35333376583884

});

board.on("ready", function(){
    var tmpSensor = new five.Sensor({
        pin: "A1",
        freq: pollFrequency,
        threshold: 2  // also report if the temperature jumps by 2 up or down
    });

    tmpSensor.on("data", function() {
        // LM35
        var celsius = (5 * this.value * 100) / 1024;
        console.log("currently measured " + celsius + "°C");
        tempReporter.upload(parseFloat(celsius.toFixed(1)), (+new Date()), function(err, response) {
            if(err) {
                console.log(err);
            } else {
                console.log("posted the data, statusCode was: ", response.statusCode);
            }
        });
    });
});
