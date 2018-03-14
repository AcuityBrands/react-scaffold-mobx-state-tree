// For more inspiration - see 
// https://github.com/mapbox/mapbox-gl-js-mock/blob/master/classes/map.js

function functor(x) {
  return function() {
    return x;
  };
}

var Map = function(options) {
  this.on = jest.fn();
}

Map.prototype.addLayer = function(layer, before) {};
Map.prototype.removeLayer = function(layerId) {};
Map.prototype.getLayer = function(layerId) {};

Map.prototype.getZoom = function() { return this.zoom; };
Map.prototype.getBearing = functor(0);
Map.prototype.getPitch = functor(0);
Map.prototype.getCenter = function() { return this.center; };
Map.prototype.setCenter = function(x) { this.center = new LngLat(x[0], x[1])};

Map.prototype.doubleClickZoom = {
  disable: function() {},
  enable: function() {}
}

Map.prototype.boxZoom = {
  disable: function() {},
  enable: function() {}
}

Map.prototype.dragPan = {
  disable: function() {},
  enable: function() {}
}

module.exports = { Map }