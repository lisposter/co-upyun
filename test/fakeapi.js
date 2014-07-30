var co = require('co');
var should = require('should');
var thunk = require('thunkify');
var UPYUN = require('..');

var fs = require('fs');
var read = thunk(fs.readFile);

var upyun = new UPYUN('travis', 'travisci', 'testtest', 'ctcc');

// set a fake api to test error callback
describe('Error', function() {
    describe('request error', function() {
        
        it('should return an error', function(done) {         
            co(function *() {
                upyun.setConf('endpoint', 'invalid');
                try{
                    var res = yield upyun.getUsage();
                } catch(e) {
                    e.toString().should.match(/Error/);
                }
            })(done)
        })

        it('should return an error', function(done) {   
            co(function *() {
                upyun.setConf('endpoint', 'invalid');
                try{
                    var res = yield upyun.getFileList('/');
                } catch(e) {
                   e.toString().should.match(/Error/);
                }
            })(done)
        })

        it('should return an error', function(done) {         
            co(function *() {
                upyun.setConf('endpoint', 'invalid');
                try{
                    var res = yield upyun.createDir('/error/');
                } catch(e) {
                    e.toString().should.match(/Error/);
                }
            })(done)
        })

        it('should return an error', function(done) {         
            co(function *() {
                upyun.setConf('endpoint', 'invalid');
                try{
                    var res = yield upyun.removeDir('/error/');
                } catch(e) {
                    e.toString().should.match(/Error/);
                }
            })(done)
        })

        it('should return an error', function(done) {         
            co(function *() {
                upyun.setConf('endpoint', 'invalid');
                try{
                    var res = yield upyun.uploadFile('/errorfile', '/null');
                } catch(e) {
                    e.toString().should.match(/Error/);
                }
            })(done)
        })

        it('should return an error', function(done) {         
            co(function *() {
                upyun.setConf('endpoint', 'invalid');
                try{
                    var res = yield upyun.getFileInfo('/errorfile');
                } catch(e) {
                    e.toString().should.match(/Error/);
                }
            })(done)
        })

        it('should return an error', function(done) {         
            co(function *() {
                upyun.setConf('endpoint', 'invalid');
                try{
                    var res = yield upyun.downloadFile('/errorfile');
                } catch(e) {
                    e.toString().should.match(/Error/);
                }
            })(done)
        })

        it('should return an error', function(done) {         
            co(function *() {
                upyun.setConf('endpoint', 'invalid');
                try{
                    var res = yield upyun.removeFile('/errorfile');
                } catch(e) {
                    e.toString().should.match(/Error/);
                }
            })(done)
        })

       
    })
})