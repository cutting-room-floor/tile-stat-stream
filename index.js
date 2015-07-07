var Transform = require('stream').Transform;
var util = require('util');
var zlib = require('zlib');

var VectorTile = require('vector-tile').VectorTile;
var Protobuf = require('pbf');

var VectorLayerStats = require('./vector_layer_stats');

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
    // duck-type tile detection to avoid requiring tilelive
    if (data.x !== undefined &&
        data.y !== undefined &&
        data.z !== undefined &&
        data.buffer !== undefined) {
        zlib.gunzip(data.buffer, function(err, inflatedBuffer) {
            if (err) return callback();
            var vectorTile = new VectorTile(new Protobuf(inflatedBuffer));
            for (var layerName in vectorTile.layers) {
                if (this.vectorLayers[layerName] === undefined) {
                    this.vectorLayers[layerName] = new VectorLayerStats();
                }
                var layer = vectorTile.layers[layerName];
                for (var i = 0; i < layer.length; i++) {
                    this.vectorLayers[layerName].analyzeFeature(layer.feature(i));
                }
            }
            callback();
        }.bind(this));
    } else {
        callback();
    }
};

TileStatStream.prototype.getStatistics = function() {
    var stats = {};
    for (var layer in this.vectorLayers) {
        stats[layer] = this.vectorLayers[layer].getStatistics();
    }
    return stats;
};

module.exports = TileStatStream;
