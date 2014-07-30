var crypto = require('crypto');

function md5sum(data) {
    var md5 = crypto.createHash('md5');
    md5.update(data, 'utf8');
    return md5.digest('hex');
}

function makeSign(method, uri, date, length, password, username){
    var sign = method + '&' + uri + '&' + date + '&' + length + '&' + md5sum(password);
    return 'UpYun ' + username + ':' + md5sum(sign);
}

function transEndpoint(endpoint) {
    switch((endpoint ? endpoint : '').toLowerCase()) {
        case 'ctcc':
            return 'v1.api.upyun.com';
        case 'cucc':
            return 'v2.api.upyun.com';
        case 'cmcc':
            return 'v3.api.upyun.com';
        default:
            return 'v0.api.upyun.com';
    }
}

module.exports = {
    md5sum: md5sum,
    makeSign: makeSign,
    transEndpoint: transEndpoint
}