var Transform = require('stream').Transform;
var util = require('util');
// var VectorLayer = require('./vector_layer');

/**
 * TileStatStream is the exported functionality of this module: it is a
 * writable stream that collects statistics from vector tiles.
 */
function TileStatStream() {
    this.vectorLayers = {};
    Transform.call(this, { readableObjectMode: true, objectMode: true });
}

util.inherits(TileStatStream, Transform);

TileStatStream.prototype._transform = function(tile, enc, callback) {
    this.push(tile);
    callback();
};

module.exports = TileStatStream;
