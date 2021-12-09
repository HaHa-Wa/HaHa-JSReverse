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

// headers hook
(function() {
    var org = window.XMLHttpRequest.prototype.setRequestHeader;
    window.XMLHttpRequest.prototype.setRequestHeader = function(key, value) {
        if (key == 'lxlxlx') {
            debugger;
        }
        return org.apply(this, arguments);
    }
})()