var vectorTileGeometryTypes = require('vector-tile').VectorTileFeature.types;

/**
 * VectorLayer collects statistics from a single vector_layer within
 * a vector tile.
 */
function VectorLayerStats() {
    this.UNIQUE_VALUES_MAX = 100;
    this.count = 0;
    this.fields = {};
    this.geometryTypeCounts = [0, 0, 0, 0];
}

VectorLayerStats.prototype.analyzeFeature = function(feature) {
    this.count++;
    this.geometryTypeCounts[feature.type]++;
    for (var name in feature.properties) {
        this.analyzeProperty(name, feature.properties[name]);
    }
};

VectorLayerStats.prototype.analyzeProperty = function(name, value) {
    if (this.fields[name] === undefined) {
        this.fields[name] = {
            min: null,
            max: null,
            sum: 0,
            uniqueValues: new Set()
        };
    }
    var field = this.fields[name];

    if (typeof value === 'number') {
        field.sum += value;
    }

    if (field.max === null || value > field.max) {
        field.max = value;
    }

    if (field.min === null || value < field.min) {
        field.min = value;
    }

    if (field.uniqueValues.size < this.UNIQUE_VALUES_MAX &&
        field.uniqueValues[value] === undefined) {
        field.uniqueValues.add(value);
    }
};

function setToArray(set) {
    var values = [];
    set.forEach(function(value) { values.push(value); });
    return values;
}

VectorLayerStats.prototype.getStatistics = function() {
    var fields = {};

    for (var field in this.fields) {
        fields[field] = {
            min: this.fields[field].min,
            max: this.fields[field].max,
            sum: this.fields[field].sum,
            values: setToArray(this.fields[field].uniqueValues)
        };
    }

    return {
        geometryTypes: this.geometryTypeCounts.reduce(function(memo, count, i) {
            memo[vectorTileGeometryTypes[i]] = count;
            return memo;
        }, {}),
        count: this.count,
        fields: fields
    };
};

module.exports = VectorLayerStats;
