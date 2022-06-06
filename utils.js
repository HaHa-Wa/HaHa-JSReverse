const CryptoJS = require('crypto-js');

var window = {
    atob:
        function (strText) {
            return new Buffer.from(strText, "base64").toString("binary")
        },
    btoa: function (strText) {
        new Buffer.from(strText, "binary").toString("base64")
    }
}

// 定时器
for (var i = 1; i < 99999; i++) {
    window.clearInterval(i);
}

// headers hook
(function () {
    var org = window.XMLHttpRequest.prototype.setRequestHeader;
    window.XMLHttpRequest.prototype.setRequestHeader = function (key, value) {
        if (key == 'kl_sign') {
            debugger;
        }
        return org.apply(this, arguments);
    }
})()


    // url hook
    (function () {
        var open = window.XMLHttpRequest.prototype.open;
        window.XMLHttpRequest.prototype.open = function (method, url, async) {
            if (url.indexOf("p") > -1) {
                debugger;
            }
            return open.apply(this, arguments);
        };
    })()

// cookie hook
(function(){
    var org = document.cookie.__lookupSetter__('cookie');
    document.__defineSetter__("cookie",function(cookie){
        if(cookie.indexOf('m')>-1){
            debugger;
        }
        org = cookie;
    });
    document.__defineGetter__("cookie",function(){return org;});
})()

// 吐环境
window = new Proxy(window, {

    get: function (target, key, receiver) {

        console.log('window.get.key: ', key);

        if (target[key] instanceof Object) {

            return new Proxy(target[key], {

                get: function (a, b, c) {

                    console.log('window.get.instance.key: ', key, b);
                    return a[b];
                },
                set: function (a, b, c, d) {

                    a[b] = c;
                }
            })
        }

        return target[key];
    },
    set: function (target, key, value, receiver) {

        console.log('window.set.key: ', key);
        console.log('window.set.value: ', value);
        console.log(target, key, value, receiver);
        target[key] = value;
    }
});