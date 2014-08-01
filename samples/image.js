var co = require('co');
var UPYUN = require('../');
var fs = require('fs');

var upyun = new UPYUN('travis-img', 'travisci', 'testtest', 'ctcc');

co(function *() {

    // The last params is an object cantion's additional request headers,
    // eg. to process an image.
    var res = yield upyun_img.uploadFile('/test/upyun_logo.png', './upyun_logo.png', true, null, {
        "x-gmkerl-type": "fix_both",
        "x-gmkerl-value": "400x400",
        "x-gmkerl-rotate": 90
    });
    console.log(res);

})()