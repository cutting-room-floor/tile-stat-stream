var test = require('tape'),
    path = require('path'),
    os = require('os'),
    crypto = require('crypto');

var TileStatStream = require('../');

var tilelive = require('tilelive'),
    MBTiles = require('mbtiles');

MBTiles.registerProtocols(tilelive);

var tmp = os.tmpdir();

test('TileStatStream', function(t) {
    var stream = new TileStatStream();
    t.ok(stream, 'stream is constructed');
    t.end();
});

test('tilelive { transform: TileStatStream }', function(t) {
    var src = path.join(__dirname, '/fixtures/valid-vectorgzip.mbtiles');
    var dst = path.join(tmp, crypto.randomBytes(12).toString('hex') + '.tilelivecopy.mbtiles');
    var tileStatStream = new TileStatStream();

    tilelive.copy(src, dst, { transform: tileStatStream }, function(err) {
        console.log(JSON.stringify(tileStatStream.getStatistics(), null, 2));
        /*
        t.deepEqual(tileStatStream.getStatistics(), {
            world_merc: {
                min: null,
                max: null,
                count: 0,
                geometryTypes: {
                    Unknown: 0,
                    LineString: 0,
                    Polygon: 245,
                    Point: 0
                }
            }
        });
        */
        t.error(err, 'success');
        t.end();
    });
});
