// https://bz.zzzmh.cn/index
var window = {
    atob :
        function (strText){return new Buffer.from(strText, "base64").toString("binary")},
    btoa: function (strText){new Buffer.from(strText, "binary").toString("base64")}
}


function _0x2d209e(_0x5e74e0) {
    for (var _0x536c72, _0x3545f0, _0x26b638 = "", _0x3d15b0 = 0; _0x3d15b0 < _0x5e74e0["length"];) _0x536c72 = _0x5e74e0[_0x3d15b0], _0x3545f0 = 0,
        _0x536c72 >>> 7 === 0 ? (_0x26b638 += String["fromCharCode"](_0x5e74e0[_0x3d15b0]),
        _0x3d15b0 += 1) : 252 === (252 & _0x536c72) ? (_0x3545f0 = (3 & _0x5e74e0[_0x3d15b0]) << 30, _0x3545f0 |= (63 & _0x5e74e0[_0x3d15b0 + 1]) << 24, _0x3545f0 |= (63 & _0x5e74e0[_0x3d15b0 + 2]) << 18, _0x3545f0 |= (63 & _0x5e74e0[_0x3d15b0 + 3]) << 12, _0x3545f0 |= (63 & _0x5e74e0[_0x3d15b0 + 4]) << 6, _0x3545f0 |= 63 & _0x5e74e0[_0x3d15b0 + 5],
        _0x26b638 += String["fromCharCode"](_0x3545f0), _0x3d15b0 += 6) : 248 === (248 & _0x536c72) ? (_0x3545f0 = (7 & _0x5e74e0[_0x3d15b0]) << 24, _0x3545f0 |= (63 & _0x5e74e0[_0x3d15b0 + 1]) << 18, _0x3545f0 |= (63 & _0x5e74e0[_0x3d15b0 + 2]) << 12, _0x3545f0 |= (63 & _0x5e74e0[_0x3d15b0 + 3]) << 6, _0x3545f0 |= 63 & _0x5e74e0[_0x3d15b0 + 4],
        _0x26b638 += String["fromCharCode"](_0x3545f0), _0x3d15b0 += 5) : 240 === (240 & _0x536c72) ? (_0x3545f0 = (15 & _0x5e74e0[_0x3d15b0]) << 18, _0x3545f0 |= (63 & _0x5e74e0[_0x3d15b0 + 1]) << 12, _0x3545f0 |= (63 & _0x5e74e0[_0x3d15b0 + 2]) << 6, _0x3545f0 |= 63 & _0x5e74e0[_0x3d15b0 + 3],
        _0x26b638 += String["fromCharCode"](_0x3545f0), _0x3d15b0 += 4) : 224 === (224 & _0x536c72) ? (_0x3545f0 = (31 & _0x5e74e0[_0x3d15b0]) << 12, _0x3545f0 |= (63 & _0x5e74e0[_0x3d15b0 + 1]) << 6, _0x3545f0 |= 63 & _0x5e74e0[_0x3d15b0 + 2],
        _0x26b638 += String["fromCharCode"](_0x3545f0), _0x3d15b0 += 3) : 192 === (192 & _0x536c72) ? (_0x3545f0 = (63 & _0x5e74e0[_0x3d15b0]) << 6, _0x3545f0 |= 63 & _0x5e74e0[_0x3d15b0 + 1],
        _0x26b638 += String["fromCharCode"](_0x3545f0), _0x3d15b0 += 2) : (_0x26b638 += String["fromCharCode"](_0x5e74e0[_0x3d15b0]), _0x3d15b0 += 1);

    return _0x26b638;
}

function _0xe69109(_0x5e74e0) {
    for (
        var _0x536c72 = window["atob"](_0x5e74e0),
        // var _0x536c72 = new Buffer.from(_0x5e74e0, "binary").toString("base64"),
            _0x3545f0 = new Int8Array(_0x536c72["length"]),
            _0x26b638 = 0; _0x26b638 < _0x536c72["length"];
        _0x26b638++)
        _0x3545f0[_0x26b638] = _0x536c72["charCodeAt"](_0x26b638);
    return _0x3545f0;
}


function _0x5c2ab7(_0x5e74e0) {
    for (var _0x536c72 = [-111, 52, 91, 65, -65, 116, 119, 106, -121, -82, -5, 80, 51, 97, 68, -83, -112, -51, 23, -46, -34, -114, -55, -11, -127, 90, 33, 22, -31, 50, -17, 20, -44, 15, -94, -123, 118, -23, -61, 114, 71, -104, -126, -117, -81, -54, -18, -110, -4, -95, -91, 94, -80, -14, 120, 105, 85, 104, -86, -108, 67, 25, 101, 108, 16, -105, 111, -10, 117, -73, 77, 89, -29, -98, -68, 112, 107, -1, 86, 121, 88, -101, -124, 69, -30, -8, -113, -74, -118, 57, -25, 12, -115, -106, 95, 127, 84, 124, -102, -28, 73, 43, -60, 28, 46, 115, 30, 122, -75, 125, -67, -77, 3, -7, -53, -13, 53, 78, -72, 1, 11, -71, -39, -79, -3, 19, 41, 126, -43, -125, -27, 34, 63, 8, 72, -35, -41, -63, 60, -24, 102, 47, -119, -103, -22, 45, 59, 64, -96, 49, 83, -107, -120, -57, -70, 0, -38, -84, -40, 24, 14, 48, 29, 44, -36, -47, 56, -92, 38, 37, 4, -50, 103, 10, -89, 55, 113, -26, 110, 54, 36, -20, -78, -12, -116, 70, -37, 5, -62, -76, -48, -64, 79, 100, 40, 6, -58, -90, -19, -9, 39, 93, -99, 21, 7, 26, -2, 27, -45, 81, 58, -122, 76, -66, 2, 92, -42, 98, -16, 9, 61, 62, -15, 99, -21, 31, -56, 87, 17, -52, -69, -33, -59, -85, 66, 74, 18, -93, -128, -87, -32, 42, 32, -88, 109, 96, 13, -6, 75, -100, -49, 35, -97, 82, -109, 123],
             _0x3545f0 = 0, _0x26b638 = 0, _0x3d15b0 = 0,
             _0x5c2ab7 = new Array(), _0x9bd313 = 0; _0x9bd313 < _0x5e74e0["length"]; _0x9bd313++) {
        _0x3545f0 = _0x3545f0 + 1 & 255, _0x26b638 = (255 & _0x536c72[_0x3545f0]) + _0x26b638 & 255;
        var _0x1ce2d3 = _0x536c72[_0x3545f0];
        _0x536c72[_0x3545f0] = _0x536c72[_0x26b638], _0x536c72[_0x26b638] = _0x1ce2d3, _0x3d15b0 = (255 & _0x536c72[_0x3545f0]) + (255 & _0x536c72[_0x26b638]) & 255, _0x5c2ab7["push"](_0x5e74e0[_0x9bd313] ^ _0x536c72[_0x3d15b0]);
    }
    console.log(_0x5c2ab7)
    return _0x5c2ab7;
}

function _0x38a85f(_0x5e74e0) {
    return _0x2d209e(_0x5c2ab7(_0xe69109(_0x5e74e0)));
}

const haha = "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"
console.log(_0x38a85f(haha))