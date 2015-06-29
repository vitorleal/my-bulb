var lifx   = require('lifx'),
    util   = require('util'),
    events = require('events'),
    helpers = require('./helpers');

/**
 * Creates an instance of Bulb object.
 * @class
 * @extends EventEmitter
 */
var Bulb = function () {
  'user strict';

  // If is not instance of Beacon return a new instance
  if (false === (this instanceof Bulb)) {
    return new Bulb();
  }

  events.EventEmitter.call(this);

  this.status = false;
  this.lifx = lifx.init();
  this.init();
};

util.inherits(Bulb, events.EventEmitter);

// Turn the light on
Bulb.prototype.turnOn = function () {
  if (!this.status) {
    this.changeColor();
    this.lifx.lightsOn();
    this.status = true;
  }
};

// Turn the light off
Bulb.prototype.turnOff = function () {
  if (this.status) {
    this.lifx.lightsOff();
    this.status = false;
  }
};

// Change light color
Bulb.prototype.changeColor = function (c) {
  var color = c || 'default';

  switch(color.toLowerCase()) {
    case 'red':
      this.lifx.lightsColour(0x0000, 0x9000, 0x4000, 0x0af0, 0x0513);
      break;

    default:
      this.lifx.lightsColour(0x0000, 0x0000, 0x8000, 0x0af0, 0x0513);
      break;
  }
};

// Blink bulb
Bulb.prototype.blink = function () {
  helpers.blink(this.lifx);
};

// Init the bulbs
Bulb.prototype.init = function () {
  var _this = this;

  // Find Lifx gateway
  this.lifx.on('gateway', function(gateway) {
    lifx.setDebug(false);

    _this.emit('ready', gateway);
  });

  // Log the Lifx bulb
  this.lifx.on('bulb', function(bulb) {
    _this.emit('newBulb', bulb);
  });
};

exports = module.exports = Bulb;

