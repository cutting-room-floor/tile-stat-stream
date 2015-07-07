var test = require('tape'),
    path = require('path'),
    os = require('os'),
    fs = require('fs'),
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
    var dstStats = path.join(__dirname, '/fixtures/valid-vectorgzip.result.json');
    var dst = path.join(tmp, crypto.randomBytes(12).toString('hex') + '.tilelivecopy.mbtiles');
    var tileStatStream = new TileStatStream();

    tilelive.copy(src, dst, { transform: tileStatStream }, function(err) {
        var stats = tileStatStream.getStatistics();
        if (process.env.UPDATE) {
            fs.writeFileSync(dstStats, JSON.stringify(stats, null, 2));
        }
        t.deepEqual(tileStatStream.getStatistics(), JSON.parse(fs.readFileSync((dstStats))));
        t.error(err, 'success');
        t.end();
    });
});
