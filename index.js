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
    
    switch((endpoint ? endpoint : '').toLowerCase()) {
        case 'ctcc':
            _CONF.endpoint = 'v1.api.upyun.com';
            break;
        case 'cucc':
            _CONF.endpoint = 'v2.api.upyun.com';
            break;
        case 'cmcc':
            _CONF.endpoint = 'v3.api.upyun.com';
            break;
        default:
            _CONF.endpoint = 'v0.api.upyun.com';
    }

}


function request(method, path, checksum, opts, body, localpath, cb){
    if(typeof arguments[arguments.length - 1] !== 'function') {
        return console.error('No callback function specified');
    };
    var callback = arguments[arguments.length - 1];
    var headers = opts || {};
    var uri = '/' + _CONF.bucket + path;
    var contentLength = 0;
    var date = (new Date()).toUTCString();
    
    var resData = '';
    function makeReq() {
        if(body && checksum === true) {
            headers['Content-MD5'] = utils.md5sum(body);
        } else if(typeof checksum === 'string') {
            headers['Content-MD5'] = checksum;
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
        return http.request(options, function(res) {
            if(localpath) {
                var ws = fs.createWriteStream(localpath);
                res.pipe(ws);
                ws.on('error', function(err) {
                    return callback(err);
                });
                ws.on('finish', function() {
                    callback(null, {
                        statusCode: res.statusCode,
                        headers: res.headers,
                    });
                });
                
            } else {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    if(chunk) {
                        resData += chunk;
                    }  
                });
                res.on('end', function() {
                    callback(null, {
                        statusCode: res.statusCode,
                        headers: res.headers,
                        data: resData
                    });
                });
            }      
        });
    }
    
    if(body) {
        if(fs.existsSync(body)) {
            contentLength = fs.statSync(body).size;
            var req = makeReq();
            var rs = fs.createReadStream(body);
            rs.pipe(req, {end: false});
            rs.on('close', function() {
                req.end();
            })
        } else {
            contentLength = body.length;
            var req = makeReq();
            req.write(body);
            req.end();
        }
    } else {
        var req = makeReq();
        req.end();
    };

    req.on('error', function(err) {
        return callback(err);
    });
    
}

UPYUN.prototype.getConf = function(key) {
    if(_CONF[key]) {
        return _CONF[key];
    }
}

UPYUN.prototype.getUsage = function() {
    return function(fn) {
        request('GET', '/?usage', null, null, null, null, function(err, res) {
            if(err) return fn(err);
            fn(null, res);
        });
    }
}

UPYUN.prototype.getFileList = function(path) {
    return function(fn) {
        request('GET', path, null, null, null, null, function(err, res) {
            if(err) return fn(err);
            var items  = res.data.split('\n');
            res.data = items.reduce(function(prev, curr, idx, arr) {
                var values = curr.split('\t');
                return prev.concat({
                    "name": values[0],
                    "type": values[1],
                    "size": values[2],
                    "lastmod": values[3]
                });
            }, []); 
            fn(null, res);
        });
    }
}

UPYUN.prototype.createDir = function(path, mkdir) {
    return function(fn) {
        var opts = { "Folder": true };
        if(mkdir !== false) opts["Mkdir"] = true;
        request('POST', path, null, opts, null, null, function(err, res) {
            if(err) return fn(err);
            fn(null, res);
        });
    }
}

UPYUN.prototype.removeDir = function(path) {
    return function(fn) {
        request('DELETE', path, null, null, null, null, function(err, res) {
            if(err) return fn(err);
            fn(null, res);
        })
    }
}

UPYUN.prototype.getFileInfo = function(path) {
    return function(fn) {
        request('HEAD', path, null, null, null, null, function(err, res) {
            if(err) return fn(err);
            res.data = Object.keys(res.headers).filter(function(itm) {
                return itm.indexOf('x-upyun') >= 0;
            }).reduce(function(prev, curr) {
                prev[curr.split('-').pop()] = res.headers[curr];
                // TODO: covert date value to millisecond.
                return prev;
            }, {});
            fn(null, res);
        })
    }
}

UPYUN.prototype.uploadFile = function(path, data, mkdir, checksum, opts) {
    return function(fn) {
        var opts = {};
        if(mkdir !== false) opts["Mkdir"] = true;
        request('PUT', path, checksum, opts, data, null, function(err, res) {
            if(err) return fn(err);
            fn(null, res);
        })
    }
}

UPYUN.prototype.downloadFile = function(path, localpath) {
    return function(fn) {
        request('GET', path, null, null, null, localpath, function(err, res) {
            if(err) return fn(err);
            fn(null, res);
        })
    }
}

UPYUN.prototype.removeFile = function(path) {
    return function(fn) {
        request('DELETE', path, null, null, null, null, function(err, res) {
            if(err) return fn(err);
            fn(null, res);
        })
    }
}


module.exports = exports.UPYUN = UPYUN;