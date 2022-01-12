function I(e) {
    return !x.some((function(t) {
            return e.indexOf(t) > -1
        }
    ))
}

function S(e, t) {
    var n, r;
    var a = "".concat('https:', "//").concat("www.toutiao.com");
    // if (I(e))
    //     a += "/toutiao";
    if (false)
        ;var i = {
        url: a + e
    };
    if (t.data)
        i.body = t.data;
    // var o = (null === (n = window.byted_acrawler) || void 0 === n ? void 0 : null === (r = n.sign) || void 0 === r ? void 0 : r.call(n, i)) || "";
    var o = null === (n = window.byted_acrawler) || void 0 === n ? void 0 : null === (r = n.sign) || void 0 === r ? void 0 : r.call(n, i);
    return o
}
n = '/api/pc/list/feed?channel_id=0&max_behot_time=1641969008&category=pc_profile_recommend&aid=24&app_name=toutiao_web'
e = {
    "url": "/api/pc/list/feed",
    "method": "get",
    "headers": {
        "common": {
            "Accept": "application/json, text/plain, */*"
        },
        "delete": {},
        "get": {},
        "head": {},
        "post": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "put": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "patch": {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    },
    "params": {
        "channel_id": 0,
        "max_behot_time": 1641969008,
        "category": "pc_profile_recommend",
        "aid": 24,
        "app_name": "toutiao_web",
        "_signature": "_02B4Z6wo00901lyUaswAAIDByEIxwcFIH-ZcsG5AAPcKk5m3zMWw9R15bz2iZvV2f5JeerTHDSAvE7dxCVbcTvxWgOkO1D2qYObEuWvQ8v38mx2FUSfPM2.YgIG3wDKf86w4R8yWg8mqAh9-2a"
    },
    "transformRequest": [
        null
    ],
    "transformResponse": [
        null
    ],
    "timeout": 10000,
    "xsrfCookieName": "XSRF-TOKEN",
    "xsrfHeaderName": "X-XSRF-TOKEN",
    "maxContentLength": -1,
    "maxBodyLength": -1
}
S(n, e)