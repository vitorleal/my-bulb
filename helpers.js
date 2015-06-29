var helpers = {
  blink: function(lx) {
    lx.lightsOff();

    setTimeout(function() {
      lx.lightsOn();
    }, 1000);

    setTimeout(function() {
      lx.lightsOff();
    }, 2000);

    setTimeout(function() {
      lx.lightsOn();
    }, 3000);

    setTimeout(function() {
      lx.lightsOff();
    }, 4000);

    setTimeout(function() {
      lx.lightsOn();
    }, 5000);

    setTimeout(function() {
      lx.lightsOff();
    }, 6000);
  }
}

module.exports = helpers;
