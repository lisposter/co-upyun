var co = require('co');
var should = require('should');
var thunk = require('thunkify');
var UPYUN = require('..');

var fs = require('fs');
var read = thunk(fs.readFile);

var upyun_img = new UPYUN('travis-img', 'travisci', 'testtest', 'ctcc');

describe('Image process', function() {
    describe('image upload and process', function(done) {
         it('should return pic info when upload file to image bucket', function(done) {
            co(function *() {
                upyun_img.setConf('bucket', 'travis-img');
                upyun_img.setEndpoint('ctcc');
                yield upyun_img.downloadFile('/res/upyun_logo.png', './upyun_logo.png');
                var res = yield upyun_img.uploadFile('/test/upyun_logo.png', './upyun_logo.png', true, null, {
                    "x-gmkerl-type": "fix_both",
                    "x-gmkerl-value": "400x400",
                    "x-gmkerl-rotate": 90
                });
                res.should.have.property('data').not.empty;
                upyun_img.setConf('bucket', 'travis');
                fs.unlinkSync('./upyun_logo.png');
            })(done)
        })
    })
})