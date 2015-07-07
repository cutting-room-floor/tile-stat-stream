/**
 * VectorLayer collects statistics from a single vector_layer within
 * a vector tile.
 */
function VectorLayer() {
    this.min = null;
    this.max = null;
    this.count = 0;

    // https://github.com/mapbox/vector-tile-js/blob/master/lib/vectortilefeature.js#L39
    this.geometryTypeCounts = {
        Unknown: 0,
        Point: 0,
        LineString: 0,
        Polygon: 0
    };
}

VectorLayer.prototype.count = function() {
};

module.exports = VectorLayer;
