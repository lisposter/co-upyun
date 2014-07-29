# co-upyun
A upyun sdk for node.js, which is for co-like interface. Can be used with `koa` or `co`.

# Install
```sh
$ npm install co-upyun
```
# Example
```js
var co = require('co');
co(function *() {
    var res = yield upyun.getUsage();
    console.log(res);
})();
```

You should always use these methods in your generator function. It works perfectly in TJ's co.

# Usage

## init a UPYUN instance.
```js
var upyun = new UPYUN('BUCKET', 'USERNAME', 'PASSWORD', 'ENDPOINT');
```
* `BUCKET`: Your upyun bucket name.
* `USERNAME`: Your upyun operator name.
* `PASSWORD`: Your upyun operator password.
* `ENDPOINT`: api address.(Default: `v0.api.upyun.com`)


# API

## `getUsage()`

## `getFileList('REMOTE_DIR_PATH')`
* `REMOTE_DIR_PATH` The dir path which you want to traverse.

## `createDir('REMOTE_DIR_PATH', 'MAKE_DIR')`
* `REMOTE_DIR_PATH` The dir path which you want to create.
* `MAKE_DIR` Auto create parent dir if it isn't exists.(Default: `true`).

## `removeDir('REMOTE_DIR_PATH')`
* `REMOTE_DIR_PATH` The dir path which you want to remove.

## `uploadFile('REMOTE_PATH', 'FILE', 'MAKE_DIR', 'OPTS')`
* `REMOTE_PATH` Where the file will be stored in your UPYUN bucket.
* `FILE` The file you want to upload. It can be a `path` string or the file's raw data.
* `MAKE_DIR` Auto create parent dir if it isn't exists.(Default: `true`).
* `OPTS` The additional http request headers. More detail in [Official Docs](http://docs.upyun.com/api/http_api/#上传文件)

## `getFileInfo('REMOTE_PATH')`
* `REMOTE_PATH` The file's path in your UPYUN bucket.

## `downloadFile('REMOTE_PATH')`
* `REMOTE_PATH` The file's path in your UPYUN bucket.

## `removeFile('REMOTE_PATH')`
* `REMOTE_PATH` The file's path in your UPYUN bucket.

# Response
For easy to use, all of the apis will return a response in this format:
```json
{
    "statusCode": 200,
    "data": {},
    "headers": {}
}
```  

__For Chinese Docs, please visit [wiki](https://github.com/lisposter/co-upyun/wiki).__

# ATTENTION
__ATTENTION:  This SDK is under develop now. lots of APIs are not implemented temporary.__

__Some APIs may changed until first stable version. （May be v0.1.0）__
