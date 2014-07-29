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
var upyun = new UPYUN('bucket', 'username', 'password', 'endpoint');
```
* `bucket`: Your upyun bucket name.
* `username`: Your upyun operator name.
* `password`: Your upyun operator password.
* `endpoint`: api address.(Default: `v0.api.upyun.com`)


# Docs
## API
* [`getUsage`](#getUsage)
* [`getFileList`](#getFileList)
* [`createDir`](#createDir)
* [`removeDir`](#removeDir)
* [`uploadFile`](#uploadFile)
* [`getFileInfo`](#getFileInfo)
* [`downloadFile`](#downloadFile)
* [`removeFile`](#removeFile)

## Utils

* [`setEndpoint`](#setEndpoint)

# API

<a name="getUsage" />
### getUsage()
To get how many quota has been used.(Unit:`Byte`)

---------------------------------------

<a name="" />
### getFileList('remote_dir_path')
Get the file list of that dir. The response contains each item's type(file or dir), size(unit: `Byte`), last modify time.

__Arguments__
* `remote_dir_path` The dir path which you want to traverse.

---------------------------------------

<a name="createDir" />
### createDir('remote_dir_path', 'make_dir')
Create a new dir in UPYUN bucket.

__Arguments__
* `remote_dir_path` The dir path which you want to create.
* `make_dir` Auto create parent dir if it isn't exists.(Default: `true`).

---------------------------------------

<a name="removeDir" />
### removeDir('remote_dir_path')
Delete a dir

* `remote_dir_path` The dir path which you want to remove.

---------------------------------------

<a name="uploadFile" />
### uploadFile('remote_path', 'file', 'make_dir', 'opts')
Upload a file into UPYUN bucket.

__Arguments__
* `remote_path` Where the file will be stored in your UPYUN bucket.
* `file` The file you want to upload. It can be a `path` string or the file's raw data.
* `make_dir` Auto create parent dir if it isn't exists.(Default: `true`).
* `opts` The additional http request headers. More detail in [Official Docs](http://docs.upyun.com/api/http_api/#上传文件)

---------------------------------------

<a name="getFileInfo" />
### getFileInfo('remote_path')
Get the file info. The response contains the file type(file or dir), size, create time.

__Arguments__
* `remote_path` The file's path in your UPYUN bucket.

---------------------------------------

<a name="downloadFile" />
### downloadFile('remote_path')
Download a file from UPYUN bucket.

__Arguments__
* `remote_path` The file's path in your UPYUN bucket.

---------------------------------------

<a name="removeFile" />
### removeFile('remote_path')
Delete a file from UPYUN bucket.

__Arguments__
* `remote_path` The file's path in your UPYUN bucket.

# Utils

### setEndpoint(endpoint)
Use this method to set api endpoint manually.

__Arguments__
* `endpoint` The value can be these:
  * `ctcc` China Telecom
  * `cucc` China Unicom
  * `cmcc` China Mobile  


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
