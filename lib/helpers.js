var helpers = {};

// Blink lights
helpers.blink = function(lifx) {
  lifx.lightsOff();

  setTimeout(function() {
    lifx.lightsOn();
  }, 1000);

  setTimeout(function() {
    lifx.lightsOff();
  }, 2000);

  setTimeout(function() {
    lifx.lightsOn();
  }, 3000);

  setTimeout(function() {
    lifx.lightsOff();
  }, 4000);

  setTimeout(function() {
    lifx.lightsOn();
  }, 5000);

  setTimeout(function() {
    lifx.lightsOff();
  }, 6000);
};

module.exports = helpers;
