var co = require('co');
var should = require('should');
var UPYUN = require('..');

var fs = require('fs');

var upyun = new UPYUN('travis', 'travisci', 'testtest', 'auto');

describe('API', function() {
    describe('.getUsage() ', function() {
        it('should contain bucket usage', function(done) {
            co(function *() {
                var res = yield upyun.getUsage();
                res.should.have.property('data').not.be.empty;
            })(done)
        })
    })

    describe('.getFileList(\'REMOTE_DIR_PATH\')', function() {
        it('should contain a file list', function(done) {
            co(function *() {
                var res = yield upyun.getFileList('/');
                res.should.have.property('data').not.be.empty;
            })(done)
        })
    })
})

