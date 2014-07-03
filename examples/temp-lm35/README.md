temp-lm35-example
=================

this example relies on [johnny-five](https://github.com/rwaldron/johnny-five).

    $ npm install

and set up your arduino board as following

<img src="https://github.com/chrkaatz/sensable-reporter/raw/master/examples/temp-lm35/simple-temp_bb.png">

Get your token
--------------

Update your settings within temperature.js and add your access token there.
To create an account at sensable.io and hover over your username after you logged and
click on "Show account info", where you can create your accessToken.

Run it
------
When you are ready, go ahead by running:

    $ node temperature.js
