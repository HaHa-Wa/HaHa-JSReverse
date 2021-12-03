const CryptoJS = require('crypto-js');

var argumentsInfo = {
    "0": "{\"x\":101.11904761904762,\"y\":5}",
    "1": "dv7mZJnuy5hLhl5Z"
}


function _0x5991af(_0x1769b9) {
    var _0x1b7485 = argumentsInfo[1] // : 'XwKsGlMcdPMEhR1B' //_0x2ba0('0xc8', 'QRmf')
    var _0x162c5c = CryptoJS.enc.Utf8.parse(_0x1b7485)
    console.log(_0x162c5c)
    var _0x5b1cd0 = CryptoJS.enc.Utf8.parse(_0x1769b9)
    var _0x42a30c = CryptoJS.AES.encrypt(_0x5b1cd0, _0x162c5c, {
        'mode': CryptoJS.mode.ECB,
        'padding': CryptoJS.pad.Pkcs7
    });
    return _0x42a30c['toString']();
}

// const ret = _0x5991af("{\"x\":101.11904761904762,\"y\":5}")
// console.log(ret)
// var _0x162c5c = parseInt((this['moveBlockLeft'] || '')['replace']('px', ''));
// var _0x162c5c = parseInt((this['moveBlockLeft'] || '')['replace']('px', ''));
// _0x162c5c = 0x136 * _0x162c5c / parseInt(this['setSize']['imgWidth']);
// _0x162c5c = 310 * _0x162c5c / parseInt(47.69230769230769);
_0x162c5c = 310 * 1 / parseInt(47.69230769230769);
var _0x5b1cd0 = {
    'captchaType': this['captchaType'],
    'pointJson':  _0x5991af(JSON['stringify']({'x': _0x162c5c, 'y': 0x5})),
    'token': this['backToken']};
console.log(_0x5b1cd0)