var express    = require('express'),
    bodyParser = require('body-parser'),
    bulb       = require('./lib/Bulb')(),
    server     = express();


// On bulbs ready
bulb.on('ready', function () {
  server.listen(process.env.PORT || 3000);
  bulb.changeColor('red');
  bulb.blink();
});

// Server routes
server.get('/status', function (req, res) {
  res.send({
    on: bulb.status
  });
});

server.get('/on', function (req, res) {
  bulb.turnOn();
  res.send({
    on: bulb.status
  });
});

server.get('/off', function (req, res) {
  bulb.turnOff();
  res.send({
    on: bulb.status
  });
});

server.get('/blink', function (req, res) {
  bulb.blink();
  res.send({
    on: bulb.status
  });
});

