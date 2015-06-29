var restify = require('restify'),
    lifx    = require('lifx'),
    lx      = lifx.init(),
    helpers = require('./helpers'),
    server  = restify.createServer(),
    bulbStatus = false;

// Turn on the light
server.get('/status', function(req, res, next) {
  res.send({ on: bulbStatus });
  next();
});

// Turn on the light
server.get('/on', function(req, res, next) {
  // lx.lightsColour(hue, saturation, luminance, whiteColour, fadeTime);
  lx.lightsColour(0x0000, 0x0000, 0x8000, 0x0af0, 0x0513);
  lx.lightsOn();

  bulbStatus = true;

  res.send({ on: bulbStatus });
  next();
});

// Turn off the light
server.get('/off', function(req, res, next) {
  lx.lightsOff();
  bulbStatus = false;

  res.send({ on: bulbStatus });
  next();
});

// Blink the light
server.get('/blink', function(req, res, next) {
  helpers.blink(lx);

  bulbStatus = false;

  res.send({ blink: true });
  next();
});

console.log('Waiting for gateway...');

// Find Lifx gateway
lx.on('gateway', function(gateway) {
  console.log('New gateway found: ' + gateway.ip);

  lifx.setDebug(false);

  // Start server
  server.listen(80, function() {
    console.log('Listening at %s', server.url);

    lx.lightsColour(0x0000, 0x9000, 0x4000, 0x0af0, 0x0513);
    helpers.blink(lx);
  });
});

// Log the Lifx bulb
lx.on('bulb', function(bulb) {
  console.log('New bulb found: ' + bulb.name);
});

// On server error
server.on('error', function(error) {
  console.log('Error: %s', error);
});

