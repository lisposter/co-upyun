var UPYUN = require('..');
var should = require('should');

var upyun = new UPYUN('travis', 'travisci', 'testtest', 'ctcc');

describe('utils', function() {
    describe('.getConf(key)', function() {
        it('should get bucket name', function() {
            upyun.getConf('bucket').should.be.exactly('travis');
        })
    })

    describe('.setEndpoint(ep)', function() {
        it('should set endpoint', function() {
            upyun.setEndpoint('ctcc');
            upyun.getConf('endpoint').should.be.exactly('v1.api.upyun.com');
        })
    })
})