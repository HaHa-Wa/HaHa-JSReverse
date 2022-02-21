u_ = {
    init: function (e, t) {
        e = this.words = e || [],
            this.sigBytes = void 0 != t ? t : 4 * e.length
    }
}
f_ = {
    stringify: function (e) {
        for (var t = e.words, n = e.sigBytes, r = [], a = 0; a < n; a++) {
            var o = t[a >>> 2] >>> 24 - a % 4 * 8 & 255;
            r.push(String.fromCharCode(o))
        }
        return r.join("")
    },
    parse: function (e) {
        for (var t = e.length, n = [], r = 0; r < t; r++)
            n[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - r % 4 * 8;
        return new u_.init(n, t)
    }
}
l_a = {
    stringify: function (e) {
        try {
            return decodeURIComponent(escape(f_.stringify(e)))
        } catch (t) {
            throw new Error("Malformed UTF-8 data")
        }
    },
    parse: function (e) {
        return f_.parse(unescape(encodeURIComponent(e)))
    }
}

parse_c = {
    _reverseMap: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        62,
        null,
        null,
        null,
        63,
        52,
        53,
        54,
        55,
        56,
        57,
        58,
        59,
        60,
        61,
        null,
        null,
        null,
        64,
        null,
        null,
        null,
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        null,
        null,
        null,
        null,
        null,
        null,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        49,
        50,
        51
    ],
    stringify: function (e) {
        var t = e.words
            , n = e.sigBytes
            , r = this._map;
        e.clamp();
        for (var a = [], o = 0; o < n; o += 3)
            for (var i = (t[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (t[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | t[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, l = 0; l < 4 && o + .75 * l < n; l++)
                a.push(r.charAt(i >>> 6 * (3 - l) & 63));
        var c = r.charAt(64);
        if (c)
            for (; a.length % 4;)
                a.push(c);
        return a.join("")
    },
    parse: function (e) {
        var n = e.length
            , r = this._map
            , a = this._reverseMap;
        if (!a) {
            a = this._reverseMap = [];
            for (var o = 0; o < r.length; o++)
                a[r.charCodeAt(o)] = o
        }
        var i = r.charAt(64);
        if (i) {
            var l = e.indexOf(i);
            -1 !== l && (n = l)
        }
        return function (e, n, r) {
            for (var a = [], o = 0, i = 0; i < n; i++)
                if (i % 4) {
                    var l = r[e.charCodeAt(i - 1)] << i % 4 * 2
                        , c = r[e.charCodeAt(i)] >>> 6 - i % 4 * 2
                        , s = l | c;
                    a[o >>> 2] |= s << 24 - o % 4 * 8,
                        o++
                }
            return {words: a, sigBytes: o}
        }(e, n, a)
    },
    _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

}

parse_t = {
    parse: function (e) {
        var t
        var n = parse_c.parse(e) // 生成数组
        var r = n.words;
        1398893684 == r[0] && 1701076831 == r[1] && (t = a.create(r.slice(2, 4)),
            r.splice(0, 4),
            n.sigBytes -= 16)
        return {
            ciphertext: n,
            salt: t
        }
    }
}

decrypt_ = function () {
    r = this.cfg.extend(r)
    t = parse_t.parse(t) // 将t转换为一个数组
    return e.createDecryptor(n, r).finalize(t.ciphertext) // 返回第二次初始化的数组
}


decodeArray = {
    _process: function (wordsInfo) {
        var n
        var r = this._data
        var a = r.words
        var o = r.sigBytes
        var i = this.blockSize
        var l = o / (4 * i)
        var c = (l = t ? e.ceil(l) : e.max((0 | l) - this._minBufferSize, 0)) * i
        var s = e.min(4 * c, o);
        if (c) {
            for (var p = 0; p < c; p += i)
                this._doProcessBlock(a, p);
            n = a.splice(0, c),
                r.sigBytes -= s
        }
        return new u.init(n, s)
    }
}


function t_(e, t, n, d_parse) {
    var r, a = d_parse.iv.words;
    a ? (r = a,
        this._iv = void 0) : r = this._prevBlock;
    for (var o = 0; o < n; o++)
        e[t + o] ^= r[o]
    return e
}

function hahaha(words, parseInfo) {

    var r = []
        , o = []
        , a = []
        , l = []
        , c = []
        , s = []
        , u = []
        , d = []
        , p = []
        , f = [];
    !function () {
        for (var e = [], t = 0; t < 256; t++)
            e[t] = t < 128 ? t << 1 : t << 1 ^ 283;
        var n = 0
            , i = 0;
        for (t = 0; t < 256; t++) {
            var m = i ^ i << 1 ^ i << 2 ^ i << 3 ^ i << 4;
            m = m >>> 8 ^ 255 & m ^ 99,
                r[n] = m,
                o[m] = n;
            var h = e[n]
                , g = e[h]
                , v = e[g]
                , b = 257 * e[m] ^ 16843008 * m;
            a[n] = b << 24 | b >>> 8,
                l[n] = b << 16 | b >>> 16,
                c[n] = b << 8 | b >>> 24,
                s[n] = b,
                b = 16843009 * v ^ 65537 * g ^ 257 * h ^ 16843008 * n,
                u[m] = b << 24 | b >>> 8,
                d[m] = b << 16 | b >>> 16,
                p[m] = b << 8 | b >>> 24,
                f[m] = b,
                n ? (n = h ^ e[e[e[v ^ h]]],
                    i ^= e[e[i]]) : n = i = 1
        }
    }();
    var m = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54]
    var h = {
        _doReset: function () {
            if (!this._nRounds || this._keyPriorReset !== this._key) {
                for (var e = this._keyPriorReset = this._key, t = e.words, n = e.sigBytes / 4, o = 4 * ((this._nRounds = n + 6) + 1), i = this._keySchedule = [], a = 0; a < o; a++)
                    a < n ? i[a] = t[a] : (s = i[a - 1],
                        a % n ? n > 6 && a % n == 4 && (s = r[s >>> 24] << 24 | r[s >>> 16 & 255] << 16 | r[s >>> 8 & 255] << 8 | r[255 & s]) : (s = r[(s = s << 8 | s >>> 24) >>> 24] << 24 | r[s >>> 16 & 255] << 16 | r[s >>> 8 & 255] << 8 | r[255 & s],
                            s ^= m[a / n | 0] << 24),
                        i[a] = i[a - n] ^ s);
                for (var l = this._invKeySchedule = [], c = 0; c < o; c++) {
                    if (a = o - c,
                    c % 4)
                        var s = i[a];
                    else
                        s = i[a - 4];
                    l[c] = c < 4 || a <= 4 ? s : u[r[s >>> 24]] ^ d[r[s >>> 16 & 255]] ^ p[r[s >>> 8 & 255]] ^ f[r[255 & s]]
                }
            }
        },
        encryptBlock: function (e, t) {
            this._doCryptBlock(e, t, this._keySchedule, a, l, c, s, r)
        },
        decryptBlock: function (e, t) {
            var n = e[t + 1];
            e[t + 1] = e[t + 3],
                e[t + 3] = n,
                this._doCryptBlock(e, t, this._invKeySchedule, u, d, p, f, o),
                n = e[t + 1],
                e[t + 1] = e[t + 3],
                e[t + 3] = n
            return e
        },
        _doCryptBlock: function (e, t, n, r, o, i, a, l) {
            for (var c = this._nRounds, s = e[t] ^ n[0], u = e[t + 1] ^ n[1], d = e[t + 2] ^ n[2], p = e[t + 3] ^ n[3], f = 4, m = 1; m < c; m++) {
                var h = r[s >>> 24] ^ o[u >>> 16 & 255] ^ i[d >>> 8 & 255] ^ a[255 & p] ^ n[f++]
                    , g = r[u >>> 24] ^ o[d >>> 16 & 255] ^ i[p >>> 8 & 255] ^ a[255 & s] ^ n[f++]
                    , v = r[d >>> 24] ^ o[p >>> 16 & 255] ^ i[s >>> 8 & 255] ^ a[255 & u] ^ n[f++]
                    , b = r[p >>> 24] ^ o[s >>> 16 & 255] ^ i[u >>> 8 & 255] ^ a[255 & d] ^ n[f++];
                s = h,
                    u = g,
                    d = v,
                    p = b
            }
            h = (l[s >>> 24] << 24 | l[u >>> 16 & 255] << 16 | l[d >>> 8 & 255] << 8 | l[255 & p]) ^ n[f++],
                g = (l[u >>> 24] << 24 | l[d >>> 16 & 255] << 16 | l[p >>> 8 & 255] << 8 | l[255 & s]) ^ n[f++],
                v = (l[d >>> 24] << 24 | l[p >>> 16 & 255] << 16 | l[s >>> 8 & 255] << 8 | l[255 & u]) ^ n[f++],
                b = (l[p >>> 24] << 24 | l[s >>> 16 & 255] << 16 | l[u >>> 8 & 255] << 8 | l[255 & d]) ^ n[f++],
                e[t] = h,
                e[t + 1] = g,
                e[t + 2] = v,
                e[t + 3] = b
        },
        keySize: 8,
        _key: parseInfo
    };
    h._doReset()
    return h.decryptBlock(words, 0)
}
function m(e) {
    return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent)
}

function h(e) {
    var t = document.cookie ? document.cookie.split("; ") : []
        , n = {};
    return t.some((function (t) {
            var r = t.split("=")
                , o = r.slice(1).join("=")
                , i = m(r[0]);
            return o = m(o),
                n[i] = o,
            e === i
        }
    )),
        e ? n[e] || "" : n
}

var g = {};

var v = {};
var b = "PSpo21JHugiRcx3vB0wtZzdsker5E+7LVYKyW8OUbf4Fa/MGqAIQmDnN9TXjlC6h".split("");

function y(e) {
    if (!e)
        return "";
    var t = {
        64: "="
    };
    b.forEach((function (e, n) {
            t[n] = e
        }
    ));
    var n = "";
    if (function (e) {
        for (var t = [], n = 0, r = 0; r < e.length; r += 1) {
            var o = e.charCodeAt(r);
            o >= 0 && o <= 127 ? (t.push(o),
                n += 1) : (o >= 2048 && o <= 55295 || o >= 57344 && o <= 65535) && (n += 3,
                t.push(224 | 15 & o >> 12),
                t.push(128 | 63 & o >> 6),
                t.push(128 | 63 & o))
        }
        for (var i = 0; i < t.length; i += 1)
            t[i] &= 255;
        return n <= 255 ? [0, n].concat(t) : [n >> 8, 255 & n].concat(t)
    }(e).slice(2).forEach((function (e) {
            n += s()(e.toString(2), 8, "0")
        }
    )),
    n.length % 24)
        for (var r = 0; r < 24 - n.length % 6; r++)
            n += "0";
    for (var o = "", i = 0; i < n.length; i += 6)
        o += t[parseInt(n.slice(i, i + 6), 2)];
    return o
}

function x(e) {
    if ("[object Array]" !== Object.prototype.toString.call(e))
        return e;
    for (var t = "", n = 0; n < e.length; n++) {
        var r = e[n].toString(2)
            , o = r.match(/^1+?(?=0)/);
        if (o && 8 === r.length) {
            for (var i = o[0].length, a = r.slice(7 - i), l = 1; l < i; l++)
                a += e[n + l].toString(2).slice(2);
            t += String.fromCharCode(parseInt(a, 2)),
                n += i - 1
        } else
            t += String.fromCharCode(e[n])
    }
    return t
}

var w = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");

function E(e) {
var t = e.ciphertext
        , n = e.secret
        , r = n.slice(0, 32)
        , a = n.slice(32)
        , i = r.slice(0, 16).split("")
        , c = r.slice(16).split("")
        , s = a.slice(0, 16).split("")
        , u = a.slice(16).split("")
        , p = s.map((function (e) {
            return i[parseInt(e, 16)]
        }
    )).join("")
        , d = u.map((function (e) {
            return c[parseInt(e, 16)]
        }
    )).join("");


    var p_parse = l_a.parse(p);
    var d_parse = {
        iv: l_a.parse(d)
    };
    ret = parse_t.parse(t)
    ret = hahaha(ret.ciphertext.words, p_parse
    )
    ret = t_(ret, 0, 4, d_parse)
    ret = l_a.stringify({
        words: ret,
        sigBytes: 32
    })
    return ret
}

function C(e) {
    var t = e.ciphertext
        , n = e.secret
        , r = {
        "=": 0
    };
    n.split("").forEach((function (e, t) {
            r[e] = t
        }
    ));
    var o = "";
    t.split("").forEach((function (e) {
            var t = r[e];
            o += s_(t.toString(2), 6, "0")
        }
    ));
    for (var i = [], a = o.length - 8; a >= 0; a -= 8) {
        var l = parseInt(o.slice(a, a + 8), 2);
        0 === l && 0 === i.length || i.unshift(l)
    }
    return x(i)
}

s_ = function (e, t, n) {
    var r = ["", " ", "  ", "   ", "    ", "     ", "      ", "       ", "        ", "         "]

    if ((t -= (e += "").length) <= 0)
        return e;
    n || 0 === n || (n = " ");
    if (" " === (n += "") && t < 10)
        return r[t] + e;
    var o = "";
    for (; 1 & t && (o += n),
               t >>= 1;)
        n += n;
    return o + e
}

r_a = function (e, t) {
        return function(e) {
            if (Array.isArray(e))
                return e
        }(e) || function(e, t) {
            if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) {
                var n = []
                  , r = !0
                  , o = !1
                  , i = void 0;
                try {
                    for (var a, l = e[Symbol.iterator](); !(r = (a = l.next()).done) && (n.push(a.value),
                    !t || n.length !== t); r = !0)
                        ;
                } catch (c) {
                    o = !0,
                    i = c
                } finally {
                    try {
                        r || null == l.return || l.return()
                    } finally {
                        if (o)
                            throw i
                    }
                }
                return n
            }
        }(e, t) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }()
    }
function S(e) {
    var t = e.ciphertext
        , n = e.secret
        , r = {
        "=": 0
    };
    w.forEach((function (e, t) {
            r[e] = t
        }
    ));
    var o = "";
    t.split("").map((function (e) {
            var t = r[e];
            o += s_(t.toString(2), 6, "0")
        }
    ));
    for (var i = o.length - 8; i >= 0; i -= 8) {
        if (0 !== parseInt(o.slice(i, i + 8), 2)) {
            o = o.slice(0, i + 8);
            break
        }
    }
    var a = n % o.length;
    o = o.slice(a) + o.slice(0, a);
    for (var l = [], c = 0; c < o.length; c += 8) {
        var u = parseInt(o.slice(c, c + 8), 2);
        l.push(u)
    }
    return x(l)
}

function O(e) {
    var t = e.ciphertext
        , n = e.secret
        , o = {
        "=": 0
    };
    w.forEach((function (e, t) {
            o[e] = t
        }
    ));
    var i = "";
    t.split("").map((function (e) {
            var t = o[e];
            i += s_(t.toString(2), 6, "0")
        }
    ));
    for (var a = "", l = i.length - 8; l >= 0; l -= 8) {
        var c = parseInt(i.slice(l, l + 8), 2);
        0 === c && 0 === a.length || (a = String.fromCharCode(c) + a)
    }
    for (var u = n.split(""), d = Object(r_a)(u, 2), p = d[0], f = d[1], m = function (e) {
        var t = parseInt(e, 16);
        return (t >= f ? t - f : t + 16 - f).toString(16)
    }, h = [], g = 0; g < a.length; g += 4) {
        var v = a.slice(g, g + 4);
        h.push(v.slice(0, p) + m(v[p]) + v.slice(+p + 1))
    }
    return x(h.map((function (e) {
            return parseInt(e, 16)
        }
    )))
}

function decodeFunc(e) {
    var t = e
        , n = t && t.web_spider_rule;
    if (!n || "string" !== typeof n)
        return t;
    var r = n.slice(34, 35)
        , o = n.slice(100).split("|");
    if (!r || !o.length)
        return t;
    var i = ""
        , a = null;
    switch (r) {
        case "1":
            i = n.slice(35, 99)
            parameter = {ciphertext: t.virtual_mobile, secret: i}
            return a = E(parameter);

        case "2":
            i = n.slice(35, 99)
            parameter = {ciphertext: t.virtual_mobile, secret: i}

            return C(parameter);
        case "3":
            i = n.slice(35, 36)
            parameter = {ciphertext: t.virtual_mobile, secret: i}

            return S(parameter);
        case "4":
            i = n.slice(35, 37)
            parameter = {ciphertext: t.virtual_mobile, secret: i}

            return O(parameter)
    }

}


ret = decodeFunc(e_data_4)
console.log(ret)