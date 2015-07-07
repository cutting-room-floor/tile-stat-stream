var Transform = require('stream').Transform;
var util = require('util');
// var zlib = require('zlib');

var VectorTile = require('vector-tile').VectorTile;
var Protobuf = require('pbf');

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

TileStatStream.prototype._transform = function(data, enc, callback) {
    // duck-type tile detection
    if (data.x !== undefined &&
        data.y !== undefined &&
        data.z !== undefined &&
        data.buffer !== undefined) {
        var tile = new VectorTile(new Protobuf(data.buffer));
        console.log(tile, data.buffer);
    } else {
        callback();
    }
};

module.exports = TileStatStream;
