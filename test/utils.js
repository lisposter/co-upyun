var UPYUN = require('..');
var should = require('should');

var upyun = new UPYUN('travis', 'travisci', 'testtest', 'ctcc');

describe('utils', function() {
    describe('.getConf(key)', function() {
        it('should get bucket name', function() {
            upyun.getConf('bucket').should.be.exactly('travis');
        })

        it('should return nothing', function() {
            (upyun.getConf('null') === undefined).should.be.true;
        })
    })

    describe('.setEndpoint(ep)', function() {
        it('should set endpoint', function() {
            upyun.setEndpoint();
            upyun.getConf('endpoint').should.be.exactly('v0.api.upyun.com');
        })

        it('should set endpoint', function() {
            upyun.setEndpoint('ctcc');
            upyun.getConf('endpoint').should.be.exactly('v1.api.upyun.com');
        })

        it('should set endpoint', function() {
            upyun.setEndpoint('cucc');
            upyun.getConf('endpoint').should.be.exactly('v2.api.upyun.com');
        })

        it('should set endpoint', function() {
            upyun.setEndpoint('cmcc');
            upyun.getConf('endpoint').should.be.exactly('v3.api.upyun.com');
        })
    })

})