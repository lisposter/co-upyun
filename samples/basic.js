var co = require('co');
var UPYUN = require('../');
var fs = require('fs');

var upyun = new UPYUN('travis', 'travisci', 'operator_passsword', 'ctcc');

co(function *() {
    var a = yield upyun.getUsage();
    console.log(a);

    var b = yield upyun.listDir('/');
    console.log(b);

    var c = yield upyun.createDir('/testdir/testsubdir', true);
    console.log(c);

    var d = yield upyun.removeDir('/testdir/testsubdir');
    console.log(d);

    var e = yield upyun.uploadFile('/lorem/lorem.txt', './LICENSE', true, null, null);
    console.log(e);

    var f = yield upyun.getFileInfo('/lorem/lorem.txt');
    console.log(f);

    var g = yield upyun.downloadFile('/lorem/lorem.txt', './dev-test/lorem.txt');
    console.log(g);

    var h = yield upyun.removeFile('/lorem/lorem.txt');
    console.log(h);
})()

