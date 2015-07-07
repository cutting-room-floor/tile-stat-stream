var Writable = require('stream').Writable;
var util = require('util');
// var VectorLayer = require('./vector_layer');

/**
 * TileStatStream is the exported functionality of this module: it is a
 * writable stream that collects statistics from vector tiles.
 */
function TileStatStream() {
    this.vectorLayers = {};
    Writable.call(this, { objectMode: true });
}

TileStatStream.prototype._write = function(tile, enc, callback) {
    this.push(tile);
    callback();
};

util.inherits(TileStatStream, Writable);

