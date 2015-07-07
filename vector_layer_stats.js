var vectorTileGeometryTypes = require('vector-tile').VectorTileFeature.types;

/**
 * VectorLayer collects statistics from a single vector_layer within
 * a vector tile.
 */
function VectorLayerStats() {
    this.min = null;
    this.max = null;
    this.count = 0;

    // https://github.com/mapbox/vector-tile-js/blob/master/lib/vectortilefeature.js#L39
    this.geometryTypeCounts = [0, 0, 0, 0];
}

VectorLayerStats.prototype.analyzeFeature = function(feature) {
    this.geometryTypeCounts[feature.type]++;
};

VectorLayerStats.prototype.getStatistics = function() {
    var stats = {
        min: this.min,
        max: this.max,
        count: this.count
    };

    stats.geometryTypes = this.geometryTypeCounts.reduce(function(memo, count, i) {
        memo[vectorTileGeometryTypes[i]] = count;
        return memo;
    }, {});

    return stats;
};

module.exports = VectorLayerStats;
