var fs = require('fs');
var http = require('http');

var utils = require('./lib/utils');
var pkg = require('./package.json');

var _CONF = {};

function UPYUN(bucket, username, password, endpoint) {
    _CONF.bucket = bucket;
    _CONF.username = username;
    _CONF.password = password;
    _CONF.version = pkg.version;
    
    switch(endpoint.toLowerCase()) {
        case 'auto':
            _CONF.endpoint = 'v0.api.upyun.com';
            break;
        case 'ctcc':
            _CONF.endpoint = 'v1.api.upyun.com';
            break;
        case 'cucc':
            _CONF.endpoint = 'v2.api.upyun.com';
            break;
        case 'cmcc':
            _CONF.endpoint = 'v3.api.upyun.com';
            break;
    }

}


function request(method, path, checksum, opts, body, callback){
    var headers = opts || {};
    var uri = '/' + _CONF.bucket + path;
    var contentLength = body ? (Buffer.isBuffer(body) ? body.length : Buffer.byteLength(body)) : 0;
    var date = (new Date()).toUTCString();
    if(body && checksum === true) {
        headers['Content-MD5'] = utils.md5sum(body);
    }
    headers['Content-Length'] = contentLength;
    headers['Date'] = date;
    headers['Authorization'] =  utils.makeSign(method, uri, date, contentLength, _CONF.password, _CONF.username);
    headers['Host'] = _CONF.endpoint;
    var options = {
        hostname: _CONF.endpoint,
        method: method,
        path: uri,
        headers: headers
    };
    var resData = '';
    var req = http.request(options, function(res) {
        
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            if(chunk) {
                resData += chunk;
            }  
        });
        res.on('end', function() {
            callback(null, resData);
        });
    });
    req.on('errer', function() {
        console.log('error')
    });
    req.end();
}

UPYUN.prototype.getConf = function(key) {
    if(_CONF[key]) {
        return _CONF[key];
    }
}

UPYUN.prototype.getUsage = function() {
    return function(fn) {
        request('GET', '/?usage', null, null, null, function(err, res) {
            if(err) return fn(err);
            fn(null, res);
        });
    }
}







module.exports = exports.UPYUN = UPYUN;