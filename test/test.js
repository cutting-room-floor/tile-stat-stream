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
        t.error(err, 'success');
        t.end();
    });
});
