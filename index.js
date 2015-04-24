var restify = require('restify'),
    lifx    = require('lifx'),
    lx      = lifx.init(),
    server  = restify.createServer();

server.get('/on', function(req, res, next) {
  lx.lightsOn();
  // lx.lightsColour(hue, saturation, luminance, whiteColour, fadeTime);
  lx.lightsColour(0x0000, 0x0000, 0x8000, 0x0af0, 0x0513);

  res.send(true);
  next();
});

server.get('/off', function(req, res, next) {
  lx.lightsOff();

  res.send(false);
  next();
});

server.get('/blink', function(req, res, next) {
  lx.lightsOff();

  setTimeout(function () {
    lx.lightsOn();
  }, 1000);

  setTimeout(function () {
    lx.lightsOff();
  }, 2000);

  setTimeout(function () {
    lx.lightsOn();
  }, 3000);

  setTimeout(function () {
    lx.lightsOff();
  }, 4000);

  setTimeout(function () {
    lx.lightsOn();
  }, 5000);

  setTimeout(function () {
    lx.lightsOff();
  }, 6000);

  res.send(false);
  next();
});

console.log('Waiting for gateway...');

lx.on('gateway', function(g) {
  console.log('New gateway found: ' + g.ip);

  lifx.setDebug(false);

  server.listen(80, function() {
    console.log('Listening at %s', server.url);
  });
});

lx.on('bulb', function(b) {
  console.log('New bulb found: ' + b.name);
});
