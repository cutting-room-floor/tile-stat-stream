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

function fixture(input) {
    test('tilelive { transform: TileStatStream }: ' + input, function(t) {
        var src = path.join(__dirname, '/fixtures/' + input);
        var dstStats = path.join(__dirname, '/fixtures/' + input + '.json');
        var dst = path.join(tmp, crypto.randomBytes(12).toString('hex') + '.mbtiles');
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
}

fixture('valid-vectorgzip.mbtiles');
fixture('valid.grids.mbtiles');
