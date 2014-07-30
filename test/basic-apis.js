var co = require('co');
var should = require('should');
var thunk = require('thunkify');
var UPYUN = require('..');

var fs = require('fs');
var read = thunk(fs.readFile);

var upyun = new UPYUN('travis', 'travisci', 'testtest', 'ctcc');

describe('API', function() {
    describe('.getUsage() ', function() {
        it('should contain bucket usage', function(done) {
            co(function *() {
                var res = yield upyun.getUsage();
                res.should.have.property('data').not.be.empty;
            })(done)
        })
    })

    describe('.getFileList(path)', function() {
        it('should contain a file list', function(done) {
            co(function *() {
                var res = yield upyun.getFileList('/');
                res.should.have.property('data').not.be.empty;
            })(done)
        })
    })

    describe('.createDir(path)', function() {
        it('should response 200', function(done) {
            co(function *() {
                var res = yield upyun.createDir('/createdirtest/');
                res.should.have.property('statusCode').be.exactly(200);
            })(done)
        })

        it('should response 200', function(done) {
            co(function *() {
                var res = yield upyun.createDir('/createdirtest2/subdir/', true);
                res.should.have.property('statusCode').be.exactly(200);
                yield upyun.removeDir('/createdirtest2/subdir/');
                yield upyun.removeDir('/createdirtest2/');
            })(done)
        })

        it('should response 200', function(done) {
            co(function *() {
                var res = yield upyun.createDir('/createdirtest3/', false);
                res.should.have.property('statusCode').be.exactly(200);
                yield upyun.removeDir('/createdirtest3/');
            })(done)
        })
    })

    describe('.removeDir(path)', function() {
        it('should response 200', function(done) {
            co(function *() {
                var res = yield upyun.removeDir('/createdirtest/');
                res.should.have.property('statusCode').be.exactly(200);
            })(done)
        })
    })

    describe('.uploadFile(path, data, mkdir, checksum, opts)', function() {
        it('should response 200', function(done) {
            co(function *() {
                var res = yield upyun.uploadFile('/lorem/lorem.txt', './LICENSE', true, null, null);
                res.should.have.property('statusCode').be.exactly(200);
            })(done)
        })

        it('should return 200', function(done) {
            co(function *() {
                var res = yield upyun.uploadFile('/lorem/lorem.txt', './LICENSE', true, '69e97c8b91968c5878f331e53b8dcbf4', null);
                res.should.have.property('statusCode').be.exactly(200);
            })(done)
        })

        it('should response 200', function(done) {
            co(function *() {
                var res = yield upyun.uploadFile('/lorem/lorem.txt', 'TESTTEST', true, null, null);
                res.should.have.property('statusCode').be.exactly(200);
            })(done)
        })

        it('should response 200', function(done) {
            co(function *() {
                var res = yield upyun.uploadFile('/lorem/lorem.txt', 'TESTTEST', true, true, null);
                res.should.have.property('statusCode').be.exactly(200);
            })(done)
        })

        it('should return not found', function(done) {
            co(function *() {
                var res = yield upyun.uploadFile('/lorem2/lorem.txt', './LICENSE', false, null, null);
                res.should.have.property('statusCode').be.exactly(404);
            })(done)
        })
    })

    describe('.getFileInfo(path)', function() {
        it('should response file info', function(done) {
            co(function *() {
                var res = yield upyun.getFileInfo('/lorem/lorem.txt');
                res.should.have.property('data').not.be.empty;
            })(done)
        })
    })

    describe('.downloadFile(path)', function() {
        it('should download a file to local', function(done) {
            co(function *() {
                var res = yield upyun.downloadFile('/lorem/lorem.txt', './test/lorem.txt');
                var a = read('./test/lorem.txt', 'utf8');
                a.should.match(/MIT/);
                fs.unlinkSync('./test/lorem.txt');
            })(done)
        })

        it('should throw an error', function(done) {
            co(function *() {
                try {
                    var g = yield upyun.downloadFile('/lorem/lorem.txt', './null/lorem.txt');
                } catch(e) {
                    e.toString().should.match(/Error/);
                }
            })(done)
        })
    })

    describe('.removeFile(path)', function() {
        it('should response 200', function(done) {
            co(function *() {
                var res = yield upyun.removeFile('/lorem/lorem.txt');
                res.should.have.property('statusCode').be.exactly(200);
            })(done)
        })
    })

})

