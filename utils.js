const CryptoJS = require('crypto-js');

var window = {
    atob :
        function (strText){return new Buffer.from(strText, "base64").toString("binary")},
    btoa: function (strText){new Buffer.from(strText, "binary").toString("base64")}
}

// 定时器
for (var i = 1; i < 99999; i++){
    window.clearInterval(i);
}
