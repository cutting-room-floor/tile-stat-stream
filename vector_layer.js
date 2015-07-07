/**
 * VectorLayer collects statistics from a single vector_layer within
 * a vector tile.
 */
function VectorLayer() {
    this.min = null;
    this.max = null;
    this.count = 0;
}

VectorLayer.prototype.count = function() {
};

module.exports = VectorLayer;
