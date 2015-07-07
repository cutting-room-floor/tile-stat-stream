# Tile Statistics Stream

A transform stream that gathers statistics from vector tile data.

## example

```js
var tilelive = require('tilelive'),
    TileStatStream = require('tile-stat-stream');

var tileStatStream = new TileStatStream();

tilelive.copy(src, dst, { transform: tileStatStream }, function(err) {
    var stats = tileStatStream.getStatistics();
});
```

## output

```json
{
  "world_merc": {
    "geometryTypes": {
      "Unknown": 0,
      "Point": 0,
      "LineString": 0,
      "Polygon": 245
    },
    "count": 245,
    "fields": {
      "AREA": {
        "min": 0,
        "max": 1638094,
        "sum": 12963239,
        "values": [
          44,
          238174,
          8260,
          2740,
```

## install

    npm install --save tile-stat-stream
