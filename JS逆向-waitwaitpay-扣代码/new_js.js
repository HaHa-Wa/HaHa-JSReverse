// https://static.waitwaitpay.com/web/sd_se/index.html#/search/searchfor=vendor
var decode_func;
var window = {};

!function (e) {
    var t = {};

    function n(r) {
        if (t[r])
            return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        console.log(r)
        return e[r].call(o.exports, o, o.exports, n),
            o.l = !0,
            o.exports
    }

    n.m = e,
        n.c = t,
        n.d = function (e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, {
                configurable: !1,
                enumerable: !0,
                get: r
            })
        },
        n.n = function (e) {
            var t = e && e.__esModule ? function () {
                    return e.default
                } :
                function () {
                    return e
                };
            return n.d(t, "a", t),
                t
        },
        n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        },
        n.p = "",
        n(n.s = 0)
}(
    [
        function (e, t, n) {
            "use strict";
            var r = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var r in n)
                            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                    }
                    return e
                }
                , o = s(n(1))
                // , a = s(n(452))
                , i = s(n(11))

            function s(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function c() {
                haha = {
                    "x-app-version": "",
                    "x-device-id": window.waitpay_device_id,
                    "x-device-system": l.PLATFORM_IS_IOS ? "iOS_qq_web" : "Android_qq_web",
                    "x-device-version": "",
                    "x-device-brand": "",
                    "x-device-model": "",
                    "x-position": u.store.getState().position.latitude + "," + u.store.getState().position.longitude,
                    "x-location": "" + escape(u.store.getState().position.city),
                    "x-connection": "wifi",
                    "x-channel": i.default.CHANNEL_ID
                }
                console.log(haha)
                return haha
            }


            function a_decode(e) {
                var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                var p = /[\t\n\f\r ]/g
                var t = (e = String(e).replace(p, "")).length;
                t % 4 == 0 && (t = (e = e.replace(/==?$/, "")).length),
                (t % 4 == 1 || /[^+a-zA-Z0-9/]/.test(e)) && f("Invalid character: the string to be decoded is not correctly encoded.");
                for (var n, r, o = 0, i = "", a = -1; ++a < t;)
                    r = d.indexOf(e.charAt(a)),
                        n = o % 4 ? 64 * n + r : r,
                    o++ % 4 && (i += String.fromCharCode(255 & n >> (-2 * o & 6)));
                return i
            }


            function f(e) {
                if (!i.default.PRODUCTION || "{" === e[0])
                    return JSON.parse(e);
                var t = void 0;
                t = a_decode(e).slice(10).split("").map(function (e) {
                    return e.charCodeAt(0)
                });
                console.log(t);
                t = new Uint8Array(t);
                console.log('Uint8Array:', t)
                t = o.default.inflate(t);
                console.log('default.inflate:', t)
                t = function (e) {
                    var t = void 0
                        , n = void 0
                        , r = void 0
                        , o = void 0
                        , i = void 0
                        , a = void 0;
                    t = "",
                        r = e.length,
                        n = 0;
                    for (; n < r;)
                        switch ((o = e[n++]) >> 4) {
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                                t += String.fromCharCode(o);
                                break;
                            case 12:
                            case 13:
                                i = e[n++],
                                    t += String.fromCharCode((31 & o) << 6 | 63 & i);
                                break;
                            case 14:
                                i = e[n++],
                                    a = e[n++],
                                    t += String.fromCharCode((15 & o) << 12 | (63 & i) << 6 | (63 & a) << 0)
                        }
                    return t
                    console.log(t)
                }(t = new Uint16Array(t))
                t = decodeURIComponent(t)
                return JSON.parse(t)
            }

            e.exports = {
                headers: c,
                decodeData: f
            }
            decode_func = {
                headers: c,
                decodeData: f
            };
        },

        function (e, t, n) {
            "use strict";
            var r = n(2)
                , o = n(3)
                , i = n(4)
                , a = n(5)
                // , u = n(13)
                , l = n(6)
                , s = n(11)
                , c = Object.prototype.toString;

            function f(e) {
                if (!(this instanceof f))
                    return new f(e);
                this.options = o.assign({
                    chunkSize: 16384,
                    windowBits: 0,
                    to: ""
                }, e || {});
                var t = this.options;
                t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits,
                0 === t.windowBits && (t.windowBits = -15)),
                !(t.windowBits >= 0 && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32),
                t.windowBits > 15 && t.windowBits < 48 && 0 == (15 & t.windowBits) && (t.windowBits |= 15),
                    this.err = 0,
                    this.msg = "",
                    this.ended = !1,
                    this.chunks = [],
                    this.strm = new l,
                    this.strm.avail_out = 0;
                var n = r.inflateInit2(this.strm, t.windowBits);


            }

            function d(e, t) {
                var n = new f(t);
                console.log(n)
                if (n.push(e, !0),
                    n.err)
                    throw n.msg || u[n.err];
                return n.result
            }

            f.prototype.push = function (e, t) {
                var n, u, l, s, f, d = this.strm, p = this.options.chunkSize, h = this.options.dictionary, m = !1;
                if (this.ended)
                    return !1;
                u = t === ~~t ? t : !0 === t ? a.Z_FINISH : a.Z_NO_FLUSH,
                    "string" == typeof e ? d.input = i.binstring2buf(e) : "[object ArrayBuffer]" === c.call(e) ? d.input = new Uint8Array(e) : d.input = e,
                    d.next_in = 0,
                    d.avail_in = d.input.length;
                do {
                    if (0 === d.avail_out && (d.output = new o.Buf8(p),
                        d.next_out = 0,
                        d.avail_out = p),
                    (n = r.inflate(d, a.Z_NO_FLUSH)) === a.Z_NEED_DICT && h && (n = r.inflateSetDictionary(this.strm, h)),
                    n === a.Z_BUF_ERROR && !0 === m && (n = a.Z_OK,
                        m = !1),
                    n !== a.Z_STREAM_END && n !== a.Z_OK)
                        return this.onEnd(n),
                            this.ended = !0,
                            !1;
                    d.next_out && (0 !== d.avail_out && n !== a.Z_STREAM_END && (0 !== d.avail_in || u !== a.Z_FINISH && u !== a.Z_SYNC_FLUSH) || ("string" === this.options.to ? (l = i.utf8border(d.output, d.next_out),
                        s = d.next_out - l,
                        f = i.buf2string(d.output, l),
                        d.next_out = s,
                        d.avail_out = p - s,
                    s && o.arraySet(d.output, d.output, l, s, 0),
                        this.onData(f)) : this.onData(o.shrinkBuf(d.output, d.next_out)))),
                    0 === d.avail_in && 0 === d.avail_out && (m = !0)
                } while ((d.avail_in > 0 || 0 === d.avail_out) && n !== a.Z_STREAM_END);
                return n === a.Z_STREAM_END && (u = a.Z_FINISH),
                    u === a.Z_FINISH ? (n = r.inflateEnd(this.strm),
                        this.onEnd(n),
                        this.ended = !0,
                    n === a.Z_OK) : u !== a.Z_SYNC_FLUSH || (this.onEnd(a.Z_OK),
                        d.avail_out = 0,
                        !0)
            }
                ,
                f.prototype.onData = function (e) {
                    this.chunks.push(e)
                }
                ,
                f.prototype.onEnd = function (e) {
                    e === a.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)),
                        this.chunks = [],
                        this.err = e,
                        this.msg = this.strm.msg
                },
                t.Inflate = f,
                t.inflate = d,
                t.inflateRaw = function (e, t) {
                    return (t = t || {}).raw = !0,
                        d(e, t)
                }
                ,
                t.ungzip = d
        }, // 423 - 1
        function (e, t, n) {
            "use strict";
            var r = n(3)
                , o = n(8)
                , i = n(7)
                , a = n(9)
                , u = n(10)
                , l = 0
                , s = 1
                , c = 2
                , f = 4
                , d = 5
                , p = 6
                , h = 0
                , m = 1
                , y = 2
                , g = -2
                , v = -3
                , b = -4
                , _ = -5
                , w = 8
                , S = 1
                , E = 2
                , x = 3
                , T = 4
                , k = 5
                , O = 6
                , P = 7
                , C = 8
                , R = 9
                , I = 10
                , A = 11
                , j = 12
                , M = 13
                , F = 14
                , D = 15
                , L = 16
                , N = 17
                , V = 18
                , B = 19
                , H = 20
                , z = 21
                , W = 22
                , U = 23
                , q = 24
                , G = 25
                , K = 26
                , Y = 27
                , X = 28
                , $ = 29
                , Z = 30
                , Q = 31
                , J = 32
                , ee = 852
                , te = 592
                , ne = 15;

            function re(e) {
                return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24)
            }

            function oe(e) {
                var t;
                return e && e.state ? (t = e.state,
                    e.total_in = e.total_out = t.total = 0,
                    e.msg = "",
                t.wrap && (e.adler = 1 & t.wrap),
                    t.mode = S,
                    t.last = 0,
                    t.havedict = 0,
                    t.dmax = 32768,
                    t.head = null,
                    t.hold = 0,
                    t.bits = 0,
                    t.lencode = t.lendyn = new r.Buf32(ee),
                    t.distcode = t.distdyn = new r.Buf32(te),
                    t.sane = 1,
                    t.back = -1,
                    h) : g
            }

            function ie(e) {
                var t;
                return e && e.state ? ((t = e.state).wsize = 0,
                    t.whave = 0,
                    t.wnext = 0,
                    oe(e)) : g
            }

            function ae(e, t) {
                var n, r;
                return e && e.state ? (r = e.state,
                    t < 0 ? (n = 0,
                        t = -t) : (n = 1 + (t >> 4),
                    t < 48 && (t &= 15)),
                    t && (t < 8 || t > 15) ? g : (null !== r.window && r.wbits !== t && (r.window = null),
                        r.wrap = n,
                        r.wbits = t,
                        ie(e))) : g
            }

            function ue(e, t) {
                var n, o;
                return e ? (o = new function () {
                    this.mode = 0,
                        this.last = !1,
                        this.wrap = 0,
                        this.havedict = !1,
                        this.flags = 0,
                        this.dmax = 0,
                        this.check = 0,
                        this.total = 0,
                        this.head = null,
                        this.wbits = 0,
                        this.wsize = 0,
                        this.whave = 0,
                        this.wnext = 0,
                        this.window = null,
                        this.hold = 0,
                        this.bits = 0,
                        this.length = 0,
                        this.offset = 0,
                        this.extra = 0,
                        this.lencode = null,
                        this.distcode = null,
                        this.lenbits = 0,
                        this.distbits = 0,
                        this.ncode = 0,
                        this.nlen = 0,
                        this.ndist = 0,
                        this.have = 0,
                        this.next = null,
                        this.lens = new r.Buf16(320),
                        this.work = new r.Buf16(288),
                        this.lendyn = null,
                        this.distdyn = null,
                        this.sane = 0,
                        this.back = 0,
                        this.was = 0
                }
                    ,
                    e.state = o,
                    o.window = null,
                (n = ae(e, t)) !== h && (e.state = null),
                    n) : g
            }

            var le, se, ce = !0;

            function fe(e) {
                if (ce) {
                    var t;
                    for (le = new r.Buf32(512),
                             se = new r.Buf32(32),
                             t = 0; t < 144;)
                        e.lens[t++] = 8;
                    for (; t < 256;)
                        e.lens[t++] = 9;
                    for (; t < 280;)
                        e.lens[t++] = 7;
                    for (; t < 288;)
                        e.lens[t++] = 8;
                    for (u(s, e.lens, 0, 288, le, 0, e.work, {
                        bits: 9
                    }),
                             t = 0; t < 32;)
                        e.lens[t++] = 5;
                    u(c, e.lens, 0, 32, se, 0, e.work, {
                        bits: 5
                    }),
                        ce = !1
                }
                e.lencode = le,
                    e.lenbits = 9,
                    e.distcode = se,
                    e.distbits = 5
            }

            function de(e, t, n, o) {
                var i, a = e.state;
                return null === a.window && (a.wsize = 1 << a.wbits,
                    a.wnext = 0,
                    a.whave = 0,
                    a.window = new r.Buf8(a.wsize)),
                    o >= a.wsize ? (r.arraySet(a.window, t, n - a.wsize, a.wsize, 0),
                        a.wnext = 0,
                        a.whave = a.wsize) : ((i = a.wsize - a.wnext) > o && (i = o),
                        r.arraySet(a.window, t, n - o, i, a.wnext),
                        (o -= i) ? (r.arraySet(a.window, t, n - o, o, 0),
                            a.wnext = o,
                            a.whave = a.wsize) : (a.wnext += i,
                        a.wnext === a.wsize && (a.wnext = 0),
                        a.whave < a.wsize && (a.whave += i))),
                    0
            }

            t.inflateReset = ie,
                t.inflateReset2 = ae,
                t.inflateResetKeep = oe,
                t.inflateInit = function (e) {
                    return ue(e, ne)
                }
                ,
                t.inflateInit2 = ue,
                t.inflate = function (e, t) {
                    var n, ee, te, ne, oe, ie, ae, ue, le, se, ce, pe, he, me, ye, ge, ve, be, _e, we, Se, Ee, xe, Te,
                        ke = 0, Oe = new r.Buf8(4),
                        Pe = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                    if (!e || !e.state || !e.output || !e.input && 0 !== e.avail_in)
                        return g;
                    (n = e.state).mode === j && (n.mode = M),
                        oe = e.next_out,
                        te = e.output,
                        ae = e.avail_out,
                        ne = e.next_in,
                        ee = e.input,
                        ie = e.avail_in,
                        ue = n.hold,
                        le = n.bits,
                        se = ie,
                        ce = ae,
                        Ee = h;
                    e: for (; ;)
                        switch (n.mode) {
                            case S:
                                if (0 === n.wrap) {
                                    n.mode = M;
                                    break
                                }
                                for (; le < 16;) {
                                    if (0 === ie)
                                        break e;
                                    ie--,
                                        ue += ee[ne++] << le,
                                        le += 8
                                }
                                if (2 & n.wrap && 35615 === ue) {
                                    n.check = 0,
                                        Oe[0] = 255 & ue,
                                        Oe[1] = ue >>> 8 & 255,
                                        n.check = i(n.check, Oe, 2, 0),
                                        ue = 0,
                                        le = 0,
                                        n.mode = E;
                                    break
                                }
                                if (n.flags = 0,
                                n.head && (n.head.done = !1),
                                !(1 & n.wrap) || (((255 & ue) << 8) + (ue >> 8)) % 31) {
                                    e.msg = "incorrect header check",
                                        n.mode = Z;
                                    break
                                }
                                if ((15 & ue) !== w) {
                                    e.msg = "unknown compression method",
                                        n.mode = Z;
                                    break
                                }
                                if (le -= 4,
                                    Se = 8 + (15 & (ue >>>= 4)),
                                0 === n.wbits)
                                    n.wbits = Se;
                                else if (Se > n.wbits) {
                                    e.msg = "invalid window size",
                                        n.mode = Z;
                                    break
                                }
                                n.dmax = 1 << Se,
                                    e.adler = n.check = 1,
                                    n.mode = 512 & ue ? I : j,
                                    ue = 0,
                                    le = 0;
                                break;
                            case E:
                                for (; le < 16;) {
                                    if (0 === ie)
                                        break e;
                                    ie--,
                                        ue += ee[ne++] << le,
                                        le += 8
                                }
                                if (n.flags = ue,
                                (255 & n.flags) !== w) {
                                    e.msg = "unknown compression method",
                                        n.mode = Z;
                                    break
                                }
                                if (57344 & n.flags) {
                                    e.msg = "unknown header flags set",
                                        n.mode = Z;
                                    break
                                }
                                n.head && (n.head.text = ue >> 8 & 1),
                                512 & n.flags && (Oe[0] = 255 & ue,
                                    Oe[1] = ue >>> 8 & 255,
                                    n.check = i(n.check, Oe, 2, 0)),
                                    ue = 0,
                                    le = 0,
                                    n.mode = x;
                            case x:
                                for (; le < 32;) {
                                    if (0 === ie)
                                        break e;
                                    ie--,
                                        ue += ee[ne++] << le,
                                        le += 8
                                }
                                n.head && (n.head.time = ue),
                                512 & n.flags && (Oe[0] = 255 & ue,
                                    Oe[1] = ue >>> 8 & 255,
                                    Oe[2] = ue >>> 16 & 255,
                                    Oe[3] = ue >>> 24 & 255,
                                    n.check = i(n.check, Oe, 4, 0)),
                                    ue = 0,
                                    le = 0,
                                    n.mode = T;
                            case T:
                                for (; le < 16;) {
                                    if (0 === ie)
                                        break e;
                                    ie--,
                                        ue += ee[ne++] << le,
                                        le += 8
                                }
                                n.head && (n.head.xflags = 255 & ue,
                                    n.head.os = ue >> 8),
                                512 & n.flags && (Oe[0] = 255 & ue,
                                    Oe[1] = ue >>> 8 & 255,
                                    n.check = i(n.check, Oe, 2, 0)),
                                    ue = 0,
                                    le = 0,
                                    n.mode = k;
                            case k:
                                if (1024 & n.flags) {
                                    for (; le < 16;) {
                                        if (0 === ie)
                                            break e;
                                        ie--,
                                            ue += ee[ne++] << le,
                                            le += 8
                                    }
                                    n.length = ue,
                                    n.head && (n.head.extra_len = ue),
                                    512 & n.flags && (Oe[0] = 255 & ue,
                                        Oe[1] = ue >>> 8 & 255,
                                        n.check = i(n.check, Oe, 2, 0)),
                                        ue = 0,
                                        le = 0
                                } else
                                    n.head && (n.head.extra = null);
                                n.mode = O;
                            case O:
                                if (1024 & n.flags && ((pe = n.length) > ie && (pe = ie),
                                pe && (n.head && (Se = n.head.extra_len - n.length,
                                n.head.extra || (n.head.extra = new Array(n.head.extra_len)),
                                    r.arraySet(n.head.extra, ee, ne, pe, Se)),
                                512 & n.flags && (n.check = i(n.check, ee, pe, ne)),
                                    ie -= pe,
                                    ne += pe,
                                    n.length -= pe),
                                    n.length))
                                    break e;
                                n.length = 0,
                                    n.mode = P;
                            case P:
                                if (2048 & n.flags) {
                                    if (0 === ie)
                                        break e;
                                    pe = 0;
                                    do {
                                        Se = ee[ne + pe++],
                                        n.head && Se && n.length < 65536 && (n.head.name += String.fromCharCode(Se))
                                    } while (Se && pe < ie);
                                    if (512 & n.flags && (n.check = i(n.check, ee, pe, ne)),
                                        ie -= pe,
                                        ne += pe,
                                        Se)
                                        break e
                                } else
                                    n.head && (n.head.name = null);
                                n.length = 0,
                                    n.mode = C;
                            case C:
                                if (4096 & n.flags) {
                                    if (0 === ie)
                                        break e;
                                    pe = 0;
                                    do {
                                        Se = ee[ne + pe++],
                                        n.head && Se && n.length < 65536 && (n.head.comment += String.fromCharCode(Se))
                                    } while (Se && pe < ie);
                                    if (512 & n.flags && (n.check = i(n.check, ee, pe, ne)),
                                        ie -= pe,
                                        ne += pe,
                                        Se)
                                        break e
                                } else
                                    n.head && (n.head.comment = null);
                                n.mode = R;
                            case R:
                                if (512 & n.flags) {
                                    for (; le < 16;) {
                                        if (0 === ie)
                                            break e;
                                        ie--,
                                            ue += ee[ne++] << le,
                                            le += 8
                                    }
                                    if (ue !== (65535 & n.check)) {
                                        e.msg = "header crc mismatch",
                                            n.mode = Z;
                                        break
                                    }
                                    ue = 0,
                                        le = 0
                                }
                                n.head && (n.head.hcrc = n.flags >> 9 & 1,
                                    n.head.done = !0),
                                    e.adler = n.check = 0,
                                    n.mode = j;
                                break;
                            case I:
                                for (; le < 32;) {
                                    if (0 === ie)
                                        break e;
                                    ie--,
                                        ue += ee[ne++] << le,
                                        le += 8
                                }
                                e.adler = n.check = re(ue),
                                    ue = 0,
                                    le = 0,
                                    n.mode = A;
                            case A:
                                if (0 === n.havedict)
                                    return e.next_out = oe,
                                        e.avail_out = ae,
                                        e.next_in = ne,
                                        e.avail_in = ie,
                                        n.hold = ue,
                                        n.bits = le,
                                        y;
                                e.adler = n.check = 1,
                                    n.mode = j;
                            case j:
                                if (t === d || t === p)
                                    break e;
                            case M:
                                if (n.last) {
                                    ue >>>= 7 & le,
                                        le -= 7 & le,
                                        n.mode = Y;
                                    break
                                }
                                for (; le < 3;) {
                                    if (0 === ie)
                                        break e;
                                    ie--,
                                        ue += ee[ne++] << le,
                                        le += 8
                                }
                                switch (n.last = 1 & ue,
                                    le -= 1,
                                3 & (ue >>>= 1)) {
                                    case 0:
                                        n.mode = F;
                                        break;
                                    case 1:
                                        if (fe(n),
                                            n.mode = H,
                                        t === p) {
                                            ue >>>= 2,
                                                le -= 2;
                                            break e
                                        }
                                        break;
                                    case 2:
                                        n.mode = N;
                                        break;
                                    case 3:
                                        e.msg = "invalid block type",
                                            n.mode = Z
                                }
                                ue >>>= 2,
                                    le -= 2;
                                break;
                            case F:
                                for (ue >>>= 7 & le,
                                         le -= 7 & le; le < 32;) {
                                    if (0 === ie)
                                        break e;
                                    ie--,
                                        ue += ee[ne++] << le,
                                        le += 8
                                }
                                if ((65535 & ue) != (ue >>> 16 ^ 65535)) {
                                    e.msg = "invalid stored block lengths",
                                        n.mode = Z;
                                    break
                                }
                                if (n.length = 65535 & ue,
                                    ue = 0,
                                    le = 0,
                                    n.mode = D,
                                t === p)
                                    break e;
                            case D:
                                n.mode = L;
                            case L:
                                if (pe = n.length) {
                                    if (pe > ie && (pe = ie),
                                    pe > ae && (pe = ae),
                                    0 === pe)
                                        break e;
                                    r.arraySet(te, ee, ne, pe, oe),
                                        ie -= pe,
                                        ne += pe,
                                        ae -= pe,
                                        oe += pe,
                                        n.length -= pe;
                                    break
                                }
                                n.mode = j;
                                break;
                            case N:
                                for (; le < 14;) {
                                    if (0 === ie)
                                        break e;
                                    ie--,
                                        ue += ee[ne++] << le,
                                        le += 8
                                }
                                if (n.nlen = 257 + (31 & ue),
                                    ue >>>= 5,
                                    le -= 5,
                                    n.ndist = 1 + (31 & ue),
                                    ue >>>= 5,
                                    le -= 5,
                                    n.ncode = 4 + (15 & ue),
                                    ue >>>= 4,
                                    le -= 4,
                                n.nlen > 286 || n.ndist > 30) {
                                    e.msg = "too many length or distance symbols",
                                        n.mode = Z;
                                    break
                                }
                                n.have = 0,
                                    n.mode = V;
                            case V:
                                for (; n.have < n.ncode;) {
                                    for (; le < 3;) {
                                        if (0 === ie)
                                            break e;
                                        ie--,
                                            ue += ee[ne++] << le,
                                            le += 8
                                    }
                                    n.lens[Pe[n.have++]] = 7 & ue,
                                        ue >>>= 3,
                                        le -= 3
                                }
                                for (; n.have < 19;)
                                    n.lens[Pe[n.have++]] = 0;
                                if (n.lencode = n.lendyn,
                                    n.lenbits = 7,
                                    xe = {
                                        bits: n.lenbits
                                    },
                                    Ee = u(l, n.lens, 0, 19, n.lencode, 0, n.work, xe),
                                    n.lenbits = xe.bits,
                                    Ee) {
                                    e.msg = "invalid code lengths set",
                                        n.mode = Z;
                                    break
                                }
                                n.have = 0,
                                    n.mode = B;
                            case B:
                                for (; n.have < n.nlen + n.ndist;) {
                                    for (; ge = (ke = n.lencode[ue & (1 << n.lenbits) - 1]) >>> 16 & 255,
                                               ve = 65535 & ke,
                                               !((ye = ke >>> 24) <= le);) {
                                        if (0 === ie)
                                            break e;
                                        ie--,
                                            ue += ee[ne++] << le,
                                            le += 8
                                    }
                                    if (ve < 16)
                                        ue >>>= ye,
                                            le -= ye,
                                            n.lens[n.have++] = ve;
                                    else {
                                        if (16 === ve) {
                                            for (Te = ye + 2; le < Te;) {
                                                if (0 === ie)
                                                    break e;
                                                ie--,
                                                    ue += ee[ne++] << le,
                                                    le += 8
                                            }
                                            if (ue >>>= ye,
                                                le -= ye,
                                            0 === n.have) {
                                                e.msg = "invalid bit length repeat",
                                                    n.mode = Z;
                                                break
                                            }
                                            Se = n.lens[n.have - 1],
                                                pe = 3 + (3 & ue),
                                                ue >>>= 2,
                                                le -= 2
                                        } else if (17 === ve) {
                                            for (Te = ye + 3; le < Te;) {
                                                if (0 === ie)
                                                    break e;
                                                ie--,
                                                    ue += ee[ne++] << le,
                                                    le += 8
                                            }
                                            le -= ye,
                                                Se = 0,
                                                pe = 3 + (7 & (ue >>>= ye)),
                                                ue >>>= 3,
                                                le -= 3
                                        } else {
                                            for (Te = ye + 7; le < Te;) {
                                                if (0 === ie)
                                                    break e;
                                                ie--,
                                                    ue += ee[ne++] << le,
                                                    le += 8
                                            }
                                            le -= ye,
                                                Se = 0,
                                                pe = 11 + (127 & (ue >>>= ye)),
                                                ue >>>= 7,
                                                le -= 7
                                        }
                                        if (n.have + pe > n.nlen + n.ndist) {
                                            e.msg = "invalid bit length repeat",
                                                n.mode = Z;
                                            break
                                        }
                                        for (; pe--;)
                                            n.lens[n.have++] = Se
                                    }
                                }
                                if (n.mode === Z)
                                    break;
                                if (0 === n.lens[256]) {
                                    e.msg = "invalid code -- missing end-of-block",
                                        n.mode = Z;
                                    break
                                }
                                if (n.lenbits = 9,
                                    xe = {
                                        bits: n.lenbits
                                    },
                                    Ee = u(s, n.lens, 0, n.nlen, n.lencode, 0, n.work, xe),
                                    n.lenbits = xe.bits,
                                    Ee) {
                                    e.msg = "invalid literal/lengths set",
                                        n.mode = Z;
                                    break
                                }
                                if (n.distbits = 6,
                                    n.distcode = n.distdyn,
                                    xe = {
                                        bits: n.distbits
                                    },
                                    Ee = u(c, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, xe),
                                    n.distbits = xe.bits,
                                    Ee) {
                                    e.msg = "invalid distances set",
                                        n.mode = Z;
                                    break
                                }
                                if (n.mode = H,
                                t === p)
                                    break e;
                            case H:
                                n.mode = z;
                            case z:
                                if (ie >= 6 && ae >= 258) {
                                    e.next_out = oe,
                                        e.avail_out = ae,
                                        e.next_in = ne,
                                        e.avail_in = ie,
                                        n.hold = ue,
                                        n.bits = le,
                                        a(e, ce),
                                        oe = e.next_out,
                                        te = e.output,
                                        ae = e.avail_out,
                                        ne = e.next_in,
                                        ee = e.input,
                                        ie = e.avail_in,
                                        ue = n.hold,
                                        le = n.bits,
                                    n.mode === j && (n.back = -1);
                                    break
                                }
                                for (n.back = 0; ge = (ke = n.lencode[ue & (1 << n.lenbits) - 1]) >>> 16 & 255,
                                    ve = 65535 & ke,
                                    !((ye = ke >>> 24) <= le);) {
                                    if (0 === ie)
                                        break e;
                                    ie--,
                                        ue += ee[ne++] << le,
                                        le += 8
                                }
                                if (ge && 0 == (240 & ge)) {
                                    for (be = ye,
                                             _e = ge,
                                             we = ve; ge = (ke = n.lencode[we + ((ue & (1 << be + _e) - 1) >> be)]) >>> 16 & 255,
                                             ve = 65535 & ke,
                                             !(be + (ye = ke >>> 24) <= le);) {
                                        if (0 === ie)
                                            break e;
                                        ie--,
                                            ue += ee[ne++] << le,
                                            le += 8
                                    }
                                    ue >>>= be,
                                        le -= be,
                                        n.back += be
                                }
                                if (ue >>>= ye,
                                    le -= ye,
                                    n.back += ye,
                                    n.length = ve,
                                0 === ge) {
                                    n.mode = K;
                                    break
                                }
                                if (32 & ge) {
                                    n.back = -1,
                                        n.mode = j;
                                    break
                                }
                                if (64 & ge) {
                                    e.msg = "invalid literal/length code",
                                        n.mode = Z;
                                    break
                                }
                                n.extra = 15 & ge,
                                    n.mode = W;
                            case W:
                                if (n.extra) {
                                    for (Te = n.extra; le < Te;) {
                                        if (0 === ie)
                                            break e;
                                        ie--,
                                            ue += ee[ne++] << le,
                                            le += 8
                                    }
                                    n.length += ue & (1 << n.extra) - 1,
                                        ue >>>= n.extra,
                                        le -= n.extra,
                                        n.back += n.extra
                                }
                                n.was = n.length,
                                    n.mode = U;
                            case U:
                                for (; ge = (ke = n.distcode[ue & (1 << n.distbits) - 1]) >>> 16 & 255,
                                           ve = 65535 & ke,
                                           !((ye = ke >>> 24) <= le);) {
                                    if (0 === ie)
                                        break e;
                                    ie--,
                                        ue += ee[ne++] << le,
                                        le += 8
                                }
                                if (0 == (240 & ge)) {
                                    for (be = ye,
                                             _e = ge,
                                             we = ve; ge = (ke = n.distcode[we + ((ue & (1 << be + _e) - 1) >> be)]) >>> 16 & 255,
                                             ve = 65535 & ke,
                                             !(be + (ye = ke >>> 24) <= le);) {
                                        if (0 === ie)
                                            break e;
                                        ie--,
                                            ue += ee[ne++] << le,
                                            le += 8
                                    }
                                    ue >>>= be,
                                        le -= be,
                                        n.back += be
                                }
                                if (ue >>>= ye,
                                    le -= ye,
                                    n.back += ye,
                                64 & ge) {
                                    e.msg = "invalid distance code",
                                        n.mode = Z;
                                    break
                                }
                                n.offset = ve,
                                    n.extra = 15 & ge,
                                    n.mode = q;
                            case q:
                                if (n.extra) {
                                    for (Te = n.extra; le < Te;) {
                                        if (0 === ie)
                                            break e;
                                        ie--,
                                            ue += ee[ne++] << le,
                                            le += 8
                                    }
                                    n.offset += ue & (1 << n.extra) - 1,
                                        ue >>>= n.extra,
                                        le -= n.extra,
                                        n.back += n.extra
                                }
                                if (n.offset > n.dmax) {
                                    e.msg = "invalid distance too far back",
                                        n.mode = Z;
                                    break
                                }
                                n.mode = G;
                            case G:
                                if (0 === ae)
                                    break e;
                                if (pe = ce - ae,
                                n.offset > pe) {
                                    if ((pe = n.offset - pe) > n.whave && n.sane) {
                                        e.msg = "invalid distance too far back",
                                            n.mode = Z;
                                        break
                                    }
                                    pe > n.wnext ? (pe -= n.wnext,
                                        he = n.wsize - pe) : he = n.wnext - pe,
                                    pe > n.length && (pe = n.length),
                                        me = n.window
                                } else
                                    me = te,
                                        he = oe - n.offset,
                                        pe = n.length;
                                pe > ae && (pe = ae),
                                    ae -= pe,
                                    n.length -= pe;
                                do {
                                    te[oe++] = me[he++]
                                } while (--pe);
                                0 === n.length && (n.mode = z);
                                break;
                            case K:
                                if (0 === ae)
                                    break e;
                                te[oe++] = n.length,
                                    ae--,
                                    n.mode = z;
                                break;
                            case Y:
                                if (n.wrap) {
                                    for (; le < 32;) {
                                        if (0 === ie)
                                            break e;
                                        ie--,
                                            ue |= ee[ne++] << le,
                                            le += 8
                                    }
                                    if (ce -= ae,
                                        e.total_out += ce,
                                        n.total += ce,
                                    ce && (e.adler = n.check = n.flags ? i(n.check, te, ce, oe - ce) : o(n.check, te, ce, oe - ce)),
                                        ce = ae,
                                    (n.flags ? ue : re(ue)) !== n.check) {
                                        e.msg = "incorrect data check",
                                            n.mode = Z;
                                        break
                                    }
                                    ue = 0,
                                        le = 0
                                }
                                n.mode = X;
                            case X:
                                if (n.wrap && n.flags) {
                                    for (; le < 32;) {
                                        if (0 === ie)
                                            break e;
                                        ie--,
                                            ue += ee[ne++] << le,
                                            le += 8
                                    }
                                    if (ue !== (4294967295 & n.total)) {
                                        e.msg = "incorrect length check",
                                            n.mode = Z;
                                        break
                                    }
                                    ue = 0,
                                        le = 0
                                }
                                n.mode = $;
                            case $:
                                Ee = m;
                                break e;
                            case Z:
                                Ee = v;
                                break e;
                            case Q:
                                return b;
                            case J:
                            default:
                                return g
                        }
                    return e.next_out = oe,
                        e.avail_out = ae,
                        e.next_in = ne,
                        e.avail_in = ie,
                        n.hold = ue,
                        n.bits = le,
                        (n.wsize || ce !== e.avail_out && n.mode < Z && (n.mode < Y || t !== f)) && de(e, e.output, e.next_out, ce - e.avail_out) ? (n.mode = Q,
                            b) : (se -= e.avail_in,
                            ce -= e.avail_out,
                            e.total_in += se,
                            e.total_out += ce,
                            n.total += ce,
                        n.wrap && ce && (e.adler = n.check = n.flags ? i(n.check, te, ce, e.next_out - ce) : o(n.check, te, ce, e.next_out - ce)),
                            e.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === j ? 128 : 0) + (n.mode === H || n.mode === D ? 256 : 0),
                        (0 === se && 0 === ce || t === f) && Ee === h && (Ee = _),
                            Ee)
                }
                ,
                t.inflateEnd = function (e) {
                    if (!e || !e.state)
                        return g;
                    var t = e.state;
                    return t.window && (t.window = null),
                        e.state = null,
                        h
                }
                ,
                t.inflateGetHeader = function (e, t) {
                    var n;
                    return e && e.state ? 0 == (2 & (n = e.state).wrap) ? g : (n.head = t,
                        t.done = !1,
                        h) : g
                }
                ,
                t.inflateSetDictionary = function (e, t) {
                    var n, r = t.length;
                    return e && e.state ? 0 !== (n = e.state).wrap && n.mode !== A ? g : n.mode === A && o(1, t, r, 0) !== n.check ? v : de(e, t, r, r) ? (n.mode = Q,
                        b) : (n.havedict = 1,
                        h) : g
                }
                ,
                t.inflateInfo = "pako inflate (from Nodeca project)"
        }, // 2
        function (e, t, n) {
            "use strict";
            var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                        return typeof e
                    }
                    : function (e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }
                ,
                o = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;

            function i(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }

            t.assign = function (e) {
                for (var t = Array.prototype.slice.call(arguments, 1); t.length;) {
                    var n = t.shift();
                    if (n) {
                        if ("object" !== (void 0 === n ? "undefined" : r(n)))
                            throw new TypeError(n + "must be non-object");
                        for (var o in n)
                            i(n, o) && (e[o] = n[o])
                    }
                }
                return e
            }
                ,
                t.shrinkBuf = function (e, t) {
                    return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t,
                        e)
                }
            ;
            var a = {
                arraySet: function (e, t, n, r, o) {
                    if (t.subarray && e.subarray)
                        e.set(t.subarray(n, n + r), o);
                    else
                        for (var i = 0; i < r; i++)
                            e[o + i] = t[n + i]
                },
                flattenChunks: function (e) {
                    var t, n, r, o, i, a;
                    for (r = 0,
                             t = 0,
                             n = e.length; t < n; t++)
                        r += e[t].length;
                    for (a = new Uint8Array(r),
                             o = 0,
                             t = 0,
                             n = e.length; t < n; t++)
                        i = e[t],
                            a.set(i, o),
                            o += i.length;
                    return a
                }
            }
                , u = {
                arraySet: function (e, t, n, r, o) {
                    for (var i = 0; i < r; i++)
                        e[o + i] = t[n + i]
                },
                flattenChunks: function (e) {
                    return [].concat.apply([], e)
                }
            };
            t.setTyped = function (e) {
                e ? (t.Buf8 = Uint8Array,
                    t.Buf16 = Uint16Array,
                    t.Buf32 = Int32Array,
                    t.assign(t, a)) : (t.Buf8 = Array,
                    t.Buf16 = Array,
                    t.Buf32 = Array,
                    t.assign(t, u))
            }
                ,
                t.setTyped(o)
        }, // 3
        function (e, t, n) {
            "use strict";
            var r = n(3)
                , o = !0
                , i = !0;
            try {
                String.fromCharCode.apply(null, [0])
            } catch (e) {
                o = !1
            }
            try {
                String.fromCharCode.apply(null, new Uint8Array(1))
            } catch (e) {
                i = !1
            }
            for (var a = new r.Buf8(256), u = 0; u < 256; u++)
                a[u] = u >= 252 ? 6 : u >= 248 ? 5 : u >= 240 ? 4 : u >= 224 ? 3 : u >= 192 ? 2 : 1;

            function l(e, t) {
                if (t < 65534 && (e.subarray && i || !e.subarray && o))
                    return String.fromCharCode.apply(null, r.shrinkBuf(e, t));
                for (var n = "", a = 0; a < t; a++)
                    n += String.fromCharCode(e[a]);
                return n
            }

            a[254] = a[254] = 1,
                t.string2buf = function (e) {
                    var t, n, o, i, a, u = e.length, l = 0;
                    for (i = 0; i < u; i++)
                        55296 == (64512 & (n = e.charCodeAt(i))) && i + 1 < u && 56320 == (64512 & (o = e.charCodeAt(i + 1))) && (n = 65536 + (n - 55296 << 10) + (o - 56320),
                            i++),
                            l += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
                    for (t = new r.Buf8(l),
                             a = 0,
                             i = 0; a < l; i++)
                        55296 == (64512 & (n = e.charCodeAt(i))) && i + 1 < u && 56320 == (64512 & (o = e.charCodeAt(i + 1))) && (n = 65536 + (n - 55296 << 10) + (o - 56320),
                            i++),
                            n < 128 ? t[a++] = n : n < 2048 ? (t[a++] = 192 | n >>> 6,
                                t[a++] = 128 | 63 & n) : n < 65536 ? (t[a++] = 224 | n >>> 12,
                                t[a++] = 128 | n >>> 6 & 63,
                                t[a++] = 128 | 63 & n) : (t[a++] = 240 | n >>> 18,
                                t[a++] = 128 | n >>> 12 & 63,
                                t[a++] = 128 | n >>> 6 & 63,
                                t[a++] = 128 | 63 & n);
                    return t
                }
                ,
                t.buf2binstring = function (e) {
                    return l(e, e.length)
                }
                ,
                t.binstring2buf = function (e) {
                    for (var t = new r.Buf8(e.length), n = 0, o = t.length; n < o; n++)
                        t[n] = e.charCodeAt(n);
                    return t
                }
                ,
                t.buf2string = function (e, t) {
                    var n, r, o, i, u = t || e.length, s = new Array(2 * u);
                    for (r = 0,
                             n = 0; n < u;)
                        if ((o = e[n++]) < 128)
                            s[r++] = o;
                        else if ((i = a[o]) > 4)
                            s[r++] = 65533,
                                n += i - 1;
                        else {
                            for (o &= 2 === i ? 31 : 3 === i ? 15 : 7; i > 1 && n < u;)
                                o = o << 6 | 63 & e[n++],
                                    i--;
                            i > 1 ? s[r++] = 65533 : o < 65536 ? s[r++] = o : (o -= 65536,
                                s[r++] = 55296 | o >> 10 & 1023,
                                s[r++] = 56320 | 1023 & o)
                        }
                    return l(s, r)
                }
                ,
                t.utf8border = function (e, t) {
                    var n;
                    for ((t = t || e.length) > e.length && (t = e.length),
                             n = t - 1; n >= 0 && 128 == (192 & e[n]);)
                        n--;
                    return n < 0 ? t : 0 === n ? t : n + a[e[n]] > t ? n : t
                }
        }, // 207- 4
        function (e, t, n) {
            "use strict";
            e.exports = {
                Z_NO_FLUSH: 0,
                Z_PARTIAL_FLUSH: 1,
                Z_SYNC_FLUSH: 2,
                Z_FULL_FLUSH: 3,
                Z_FINISH: 4,
                Z_BLOCK: 5,
                Z_TREES: 6,
                Z_OK: 0,
                Z_STREAM_END: 1,
                Z_NEED_DICT: 2,
                Z_ERRNO: -1,
                Z_STREAM_ERROR: -2,
                Z_DATA_ERROR: -3,
                Z_BUF_ERROR: -5,
                Z_NO_COMPRESSION: 0,
                Z_BEST_SPEED: 1,
                Z_BEST_COMPRESSION: 9,
                Z_DEFAULT_COMPRESSION: -1,
                Z_FILTERED: 1,
                Z_HUFFMAN_ONLY: 2,
                Z_RLE: 3,
                Z_FIXED: 4,
                Z_DEFAULT_STRATEGY: 0,
                Z_BINARY: 0,
                Z_TEXT: 1,
                Z_UNKNOWN: 2,
                Z_DEFLATED: 8
            }
        }, // 209 - 5
        function (e, t, n) {
            "use strict";
            e.exports = function () {
                this.input = null,
                    this.next_in = 0,
                    this.avail_in = 0,
                    this.total_in = 0,
                    this.output = null,
                    this.next_out = 0,
                    this.avail_out = 0,
                    this.total_out = 0,
                    this.msg = "",
                    this.state = null,
                    this.data_type = 2,
                    this.adler = 0
            }
        }, // 208 - 6
        function (e, t, n) {
            "use strict";
            var r = function () {
                for (var e, t = [], n = 0; n < 256; n++) {
                    e = n;
                    for (var r = 0; r < 8; r++)
                        e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
                    t[n] = e
                }
                return t
            }();
            e.exports = function (e, t, n, o) {
                var i = r
                    , a = o + n;
                e ^= -1;
                for (var u = o; u < a; u++)
                    e = e >>> 8 ^ i[255 & (e ^ t[u])];
                return -1 ^ e
            }
        }, // 206 - 7
        function (e, t, n) {
            "use strict";
            e.exports = function (e, t, n, r) {
                for (var o = 65535 & e | 0, i = e >>> 16 & 65535 | 0, a = 0; 0 !== n;) {
                    n -= a = n > 2e3 ? 2e3 : n;
                    do {
                        i = i + (o = o + t[r++] | 0) | 0
                    } while (--a);
                    o %= 65521,
                        i %= 65521
                }
                return o | i << 16 | 0
            }
        }, // 205 - 8
        function (e, t, n) {
            "use strict";
            var r;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = Object.assign || function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n)
                        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }
                , i = (function (e) {
                e && e.__esModule
            }(n(17)))
            // n(14))
            //     , a = n(60)
            //     , u = n(210);

            function l(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n,
                    e
            }

            console.log(e, t, n)
            // t.default = (0, i.handleActions)(
            //     (l(r = {}, a.setPosition, function (e, t) {
            //         return function (e, t) {
            //             return o({}, t, {
            //                 latitude: e.payload.latitude,
            //                 longitude: e.payload.longitude,
            //                 manualSetCity: !1,
            //                 city: e.payload.city ? e.payload.city : t.city,
            //                 missLocation: null === e.payload.latitude && null === e.payload.longitude,
            //                 updatedAt: Date.now(),
            //                 didInvalidate: e.payload.didInvalidate,
            //                 distanceSinceLastTime: (0,
            //                     u.geoDistance)(e.payload.latitude, e.payload.longitude, t.latitude, t.longitude)
            //             })
            //         }(t, e)
            //     }),
            //         l(r, a.setAddress, function (e, t) {
            //             return o({}, e, {
            //                 address: t.payload
            //             })
            //         }),
            //         l(r, a.invalidatePosition, function (e, t) {
            //             return o({}, e, {
            //                 didInvalidate: !0
            //             })
            //         }),
            //         l(r, a.setCityName, function (e, t) {
            //             return o({}, e, {
            //                 city: t.payload,
            //                 manualSetCity: !0
            //             })
            //         }),
            //         l(r, a.setCityAndAddress, function (e, t) {
            //             return o({}, e, {
            //                 city: t.payload.city,
            //                 address: t.payload.address
            //             })
            //         }),
            //         l(r, a.setLocation, function (e, t) {
            //             return o({}, e, {
            //                 latitude: t.payload.latitude,
            //                 longitude: t.payload.longitude
            //             })
            //         }),
            //         r), {
            //         latitude: null,
            //         longitude: null,
            //         address: "定位中...",
            //         updatedAt: null,
            //         city: null,
            //         manualSetCity: !1,
            //         missLocation: null,
            //         didInvalidate: !0,
            //         distanceSinceLastTime: 1e4
            //     })
        }, // 429 -9
        function (e, t, n) {
            "use strict";
            var r;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var r in n)
                            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                    }
                    return e
                }
                // , i = n(14)

                , a = n(12);

            function u(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n,
                    e
            }

            var l = {
                isFetched: !1,
                dianping: {
                    name: "点评",
                    scheme: "dianping://shopinfo?id=",
                    supported: !1,
                    channel: "app"
                },
                meituan: {
                    name: "美团",
                    scheme: "imeituan://www.meituan.com/merchant?id=",
                    supported: !1,
                    channel: "app"
                },
                nuomi: {
                    name: "糯米",
                    scheme: "bainuo://component?compid=merchant-advance&comppage=index&merchantId=",
                    supported: !1,
                    channel: "app"
                },
                zssh: {
                    name: "掌上生活",
                    scheme: "cmblife://go?url=YummyCouponDetail&couponNo=",
                    homeScheme: "cmblife://",
                    maiScheme: "cmblife://go?url=YummyPayBill&strNo=",
                    supported: !1,
                    channel: "app"
                },
                maishenghuo: {
                    name: "迈生活",
                    scheme: "https://www.mileslife.com/jump/?next=https://www.mileslife.com/products/detail_pay_product/",
                    supported: !1,
                    channel: "web"
                },
                maidanba: {
                    name: "买单吧",
                    scheme: "mdb://com.bankcomm.maidanba/access?code=0&url=https://creditcardapp.bankcomm.com/food/store/details.html?merShopId=",
                    homeScheme: "mdb://com.bankcomm.maidanba/access",
                    supported: !1,
                    channel: "app"
                },
                mcd: {
                    name: "麦当劳",
                    scheme: "http://mcdcard.mcdonalds.com.cn/",
                    supported: !1,
                    channel: "web"
                },
                kfc: {
                    name: "肯德基",
                    scheme: "https://login.kfc.com.cn/CRM/superapp_wechat/coupons.html",
                    supported: !1,
                    channel: "web"
                },
                baitiao: {
                    name: "京东白条",
                    scheme: "https://sale.jd.com/m/act/qVcWzLPa8Zg.html?utm_source=Android&utm_term=wxfriends",
                    supported: !1,
                    channel: "inweb"
                },
                jd: {
                    name: "京东白条",
                    scheme: "https://sale.jd.com/m/act/qVcWzLPa8Zg.html?utm_source=Android&utm_term=wxfriends",
                    supported: !1,
                    channel: "inweb"
                },
                unionpay: {
                    name: "银联钱包",
                    scheme: "uppaywallet://",
                    homeScheme: "uppaywallet://",
                    channel: "app",
                    supported: !1
                },
                enjoy: {
                    name: "enjoy",
                    scheme: "enjoyapp://restaurant/profile?id=",
                    supported: !1,
                    channel: "inweb"
                },
                alipay: {
                    name: "支付宝",
                    scheme: "alipayqr://",
                    supported: !1,
                    channel: "app"
                },
                wechat: {
                    name: "微信支付",
                    scheme: "weixin://",
                    supported: !1,
                    channel: "app"
                },
                applepay: {
                    name: "Apple Pay支付",
                    scheme: "shoebox://",
                    supported: !0,
                    channel: "app"
                },
                kahui: {
                    name: "银行卡",
                    channel: "inweb"
                },
                bk: {
                    name: "汉堡王",
                    channel: "web"
                },
                eleme: {
                    supported: !1,
                    name: "饿了么",
                    scheme: "eleme://catering?restaurant_id=",
                    searchScheme: "eleme://search?keyword=",
                    orderScheme: "eleme://catering?target_food_id={food_id}&restaurant_id={restaurant_id}&category_id={category_id}",
                    channel: "app"
                },
                meituan_waimai: {
                    supported: !1,
                    name: "美团外卖",
                    scheme: "meituanwaimai://waimai.meituan.com/menu?restaurant_id=",
                    searchScheme: "meituanwaimai://waimai.meituan.com/search?query=",
                    orderScheme: "meituanwaimai://waimai.meituan.com/menu?restaurant_id={restaurant_id}&spu_id={food_id}",
                    channel: "app"
                },
                baidu_waimai: {
                    supported: !1,
                    name: "饿了么星选",
                    scheme: "bdwm://native?pageName=shopMenu&shopId=",
                    searchScheme: "bdwm://native?pageName=search&keyword=",
                    orderScheme: "bdwm://native?pageName=shopMenu&shopId={restaurant_id}&dishId={food_id}&categoryId={category_id}",
                    channel: "app"
                },
                mt_waimai: {
                    name: "美团",
                    scheme: "imeituan://www.meituan.com/takeout/foods?poi_id=",
                    searchScheme: "imeituan://www.meituan.com/takeout/poi/search?query=",
                    orderScheme: "imeituan://www.meituan.com/takeout/foods?poi_id={restaurant_id}&spu_id={food_id}",
                    supported: !1,
                    channel: "app"
                },
                dianping_waimai: {
                    name: "点评",
                    scheme: "dianping://web?url=https%3a%2f%2ftakeaway.dianping.com%2fwaimai%2ftransferUrl%3fsource%3d1%26mtwmpoiid%3d",
                    searchScheme: "dianping://takeaway",
                    orderScheme: "dianping://takeawaydishlist?source=1&mtwmpoiid={restaurant_id}&spuid={food_id}",
                    supported: !1,
                    channel: "app"
                },
                cgb: {
                    name: "发现精彩",
                    scheme: "credit://wl/openxml/?channel=&operationType=&short_linkType=29&short_linkType_sub1=&short_linkType_sub2=0&short_linkType_sub3=&short_link=cdbank_branchandMerchant_map_detail&short_linkName=%E5%95%86%E6%88%B7%E8%AF%A6%E6%83%85&picsIsLogined=1&picsIsNeedId=1&picsIsNeedCity=1&picsIsNeedCardType=1&picsBackUp1=111&picsBackUp2=&picsBackUp3=&picsBackUp=",
                    homeScheme: "credit://",
                    channel: "app",
                    supported: !1
                },
                spdb: {
                    name: "浦大喜奔",
                    scheme: "spdbccc://",
                    homeScheme: "spdbccc://",
                    channel: "app",
                    supported: !1
                },
                common: {
                    name: "",
                    channel: "web"
                },
                zgyh: {
                    name: "缤纷生活",
                    intro: "intro",
                    channel: "app",
                    scheme: "bocmlife://",
                    homeScheme: "bocmlife://",
                    supported: !1,
                    icon: ""
                },
                icbc: {
                    name: "工银e生活",
                    intro: "intro",
                    channel: "app",
                    scheme: "elife://",
                    homeScheme: "elife://",
                    supported: !1,
                    market: "market://details?id=com.icbc.elife",
                    icon: ""
                },
                pingan: {
                    name: "口袋银行",
                    intro: "intro",
                    channel: "app",
                    scheme: "paesuperbank://?paesuperbank=%7B%22url%22%3A%22https%3a%2f%2fb.pingan.com.cn%2fcreditcard%2fpabo2o%2fmobile%2fstore-detail%3fstoreId%3d{out_id}%26categoryId%3d3%26merId%3d29596%26rec_no%3d%26rec_type%3d%26media_source%3d%26channel_source%3d%26source%3d%26outerSource%3d%26activity_Id%3dV0280%26activity_FlowId%3dm_O0MV03cpBEQWeMJt%26SSLSOURCE%3dBROP-CMP%26activity_FlowId%3dm_O0MV03cpBEQWeMJt%22%7d",
                    homeScheme: "paesuperbank://",
                    supported: !1,
                    market: "market://details?id=com.pingan.paces.ccms",
                    icon: ""
                },
                gaode: {
                    name: "高德地图",
                    channel: "app",
                    scheme: (true ? "iosamap" : "androidamap") + "://viewMap?sourceApplication=waitpay&poiname=abc&lat=39.9963273077&lon=116.4806771731&dev=0",
                    supported: !1
                },
                baidu: {
                    name: "百度地图",
                    channel: "app",
                    scheme: (true ? "baidumap" : "bdapp") + "://map/marker?location=39.9963273077,116.4806771731&title=abc&content=abc&src=waitpay",
                    supported: !1
                }
            };
            // t.default =
            //     (0,
            //     i.handleActions)((u(r = {}, a.requestSchemes, function (e, t) {
            //     return o({}, e, {
            //         isFetched: !1
            //     })
            // }),
            //     u(r, a.receiveSchemes, function (e, t) {
            //         return o({}, e, t.payload, {
            //             isFetched: !0
            //         })
            //     }),
                // r), l)
        }, // 430 - 10
        function (e, t, n) {
            "use strict";
            e.exports = {
                API_HOST: "https://api.waitwaitpay.com",
                CHANNEL_ID: "qq_web",
                PRODUCTION: !0
            }
        }, // 11

        function (e, t, n) {
            "use strict";
            e.exports = {
                2: "need dictionary",
                1: "stream end",
                0: "",
                "-1": "file error",
                "-2": "stream error",
                "-3": "data error",
                "-4": "insufficient memory",
                "-5": "buffer error",
                "-6": "incompatible version"
            }
        }, // 12
        function (e, t, n) {
            "use strict";
            var r;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = Object.assign || function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n)
                        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }
                , i = n(8)
                , a = n(436);

            function u(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n,
                    e
            }

            t.default = (0,
                i.handleActions)((u(r = {}, a.setIsConnected, function (e, t) {
                return o({}, e, {
                    isConnected: t.payload
                })
            }),
                u(r, a.invalidateIsConnected, function (e, t) {
                    return o({}, e, {
                        didInvalidate: !0
                    })
                }),
                r), {
                isConnected: !0,
                didInvalidate: !0
            })
        }, // 431 - 13
        function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
                t.combineActions = t.handleActions = t.handleAction = t.createActions = t.createAction = void 0;
            // var r = l(n(190))
            // var o = l(n(193))
            var i = l(n(18))
            // var a = l(n(203))
            // var u = l(n(421));
            function l(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            // t.createAction = r.default,
            // t.createActions = u.default,
            // t.handleAction = o.default,
            t.handleActions = i.default
            // t.combineActions = a.default
        }, // 8 - 14
        function (e, t, n) {
            "use strict";
            var r, o = n(3), i = n(16), a = n(8), u = n(7), s = 0, c = 1, f = 3, d = 4, p = 5, h = 0,
                m = 1, y = -2, g = -3, v = -5, b = -1, _ = 1, w = 2, S = 3, E = 4, x = 0, T = 2, k = 8, O = 9, P = 15,
                C = 8, R = 286, I = 30, A = 19, j = 2 * R + 1, M = 15, F = 3, D = 258, L = D + F + 1, N = 32, V = 42,
                B = 69, H = 73, z = 91, W = 103, U = 113, q = 666, G = 1, K = 2, Y = 3, X = 4, $ = 3;

            function Z(e, t) {
                return e.msg = 'l[t]',
                    t
            }

            function Q(e) {
                return (e << 1) - (e > 4 ? 9 : 0)
            }

            function J(e) {
                for (var t = e.length; --t >= 0;)
                    e[t] = 0
            }

            function ee(e) {
                var t = e.state
                    , n = t.pending;
                n > e.avail_out && (n = e.avail_out),
                0 !== n && (o.arraySet(e.output, t.pending_buf, t.pending_out, n, e.next_out),
                    e.next_out += n,
                    t.pending_out += n,
                    e.total_out += n,
                    e.avail_out -= n,
                    t.pending -= n,
                0 === t.pending && (t.pending_out = 0))
            }

            function te(e, t) {
                i._tr_flush_block(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, t),
                    e.block_start = e.strstart,
                    ee(e.strm)
            }

            function ne(e, t) {
                e.pending_buf[e.pending++] = t
            }

            function re(e, t) {
                e.pending_buf[e.pending++] = t >>> 8 & 255,
                    e.pending_buf[e.pending++] = 255 & t
            }

            function oe(e, t, n, r) {
                var i = e.avail_in;
                return i > r && (i = r),
                    0 === i ? 0 : (e.avail_in -= i,
                        o.arraySet(t, e.input, e.next_in, i, n),
                        1 === e.state.wrap ? e.adler = a(e.adler, t, i, n) : 2 === e.state.wrap && (e.adler = u(e.adler, t, i, n)),
                        e.next_in += i,
                        e.total_in += i,
                        i)
            }

            function ie(e, t) {
                var n, r, o = e.max_chain_length, i = e.strstart, a = e.prev_length, u = e.nice_match,
                    l = e.strstart > e.w_size - L ? e.strstart - (e.w_size - L) : 0, s = e.window, c = e.w_mask,
                    f = e.prev, d = e.strstart + D, p = s[i + a - 1], h = s[i + a];
                e.prev_length >= e.good_match && (o >>= 2),
                u > e.lookahead && (u = e.lookahead);
                do {
                    if (s[(n = t) + a] === h && s[n + a - 1] === p && s[n] === s[i] && s[++n] === s[i + 1]) {
                        i += 2,
                            n++;
                        do {
                        } while (s[++i] === s[++n] && s[++i] === s[++n] && s[++i] === s[++n] && s[++i] === s[++n] && s[++i] === s[++n] && s[++i] === s[++n] && s[++i] === s[++n] && s[++i] === s[++n] && i < d);
                        if (r = D - (d - i),
                            i = d - D,
                        r > a) {
                            if (e.match_start = t,
                                a = r,
                            r >= u)
                                break;
                            p = s[i + a - 1],
                                h = s[i + a]
                        }
                    }
                } while ((t = f[t & c]) > l && 0 != --o);
                return a <= e.lookahead ? a : e.lookahead
            }

            function ae(e) {
                var t, n, r, i, a, u = e.w_size;
                do {
                    if (i = e.window_size - e.lookahead - e.strstart,
                    e.strstart >= u + (u - L)) {
                        o.arraySet(e.window, e.window, u, u, 0),
                            e.match_start -= u,
                            e.strstart -= u,
                            e.block_start -= u,
                            t = n = e.hash_size;
                        do {
                            r = e.head[--t],
                                e.head[t] = r >= u ? r - u : 0
                        } while (--n);
                        t = n = u;
                        do {
                            r = e.prev[--t],
                                e.prev[t] = r >= u ? r - u : 0
                        } while (--n);
                        i += u
                    }
                    if (0 === e.strm.avail_in)
                        break;
                    if (n = oe(e.strm, e.window, e.strstart + e.lookahead, i),
                        e.lookahead += n,
                    e.lookahead + e.insert >= F)
                        for (a = e.strstart - e.insert,
                                 e.ins_h = e.window[a],
                                 e.ins_h = (e.ins_h << e.hash_shift ^ e.window[a + 1]) & e.hash_mask; e.insert && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[a + F - 1]) & e.hash_mask,
                            e.prev[a & e.w_mask] = e.head[e.ins_h],
                            e.head[e.ins_h] = a,
                            a++,
                            e.insert--,
                            !(e.lookahead + e.insert < F));)
                            ;
                } while (e.lookahead < L && 0 !== e.strm.avail_in)
            }

            function ue(e, t) {
                for (var n, r; ;) {
                    if (e.lookahead < L) {
                        if (ae(e),
                        e.lookahead < L && t === s)
                            return G;
                        if (0 === e.lookahead)
                            break
                    }
                    if (n = 0,
                    e.lookahead >= F && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + F - 1]) & e.hash_mask,
                        n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h],
                        e.head[e.ins_h] = e.strstart),
                    0 !== n && e.strstart - n <= e.w_size - L && (e.match_length = ie(e, n)),
                    e.match_length >= F)
                        if (r = i._tr_tally(e, e.strstart - e.match_start, e.match_length - F),
                            e.lookahead -= e.match_length,
                        e.match_length <= e.max_lazy_match && e.lookahead >= F) {
                            e.match_length--;
                            do {
                                e.strstart++,
                                    e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + F - 1]) & e.hash_mask,
                                    n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h],
                                    e.head[e.ins_h] = e.strstart
                            } while (0 != --e.match_length);
                            e.strstart++
                        } else
                            e.strstart += e.match_length,
                                e.match_length = 0,
                                e.ins_h = e.window[e.strstart],
                                e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask;
                    else
                        r = i._tr_tally(e, 0, e.window[e.strstart]),
                            e.lookahead--,
                            e.strstart++;
                    if (r && (te(e, !1),
                    0 === e.strm.avail_out))
                        return G
                }
                return e.insert = e.strstart < F - 1 ? e.strstart : F - 1,
                    t === d ? (te(e, !0),
                        0 === e.strm.avail_out ? Y : X) : e.last_lit && (te(e, !1),
                    0 === e.strm.avail_out) ? G : K
            }

            function le(e, t) {
                for (var n, r, o; ;) {
                    if (e.lookahead < L) {
                        if (ae(e),
                        e.lookahead < L && t === s)
                            return G;
                        if (0 === e.lookahead)
                            break
                    }
                    if (n = 0,
                    e.lookahead >= F && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + F - 1]) & e.hash_mask,
                        n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h],
                        e.head[e.ins_h] = e.strstart),
                        e.prev_length = e.match_length,
                        e.prev_match = e.match_start,
                        e.match_length = F - 1,
                    0 !== n && e.prev_length < e.max_lazy_match && e.strstart - n <= e.w_size - L && (e.match_length = ie(e, n),
                    e.match_length <= 5 && (e.strategy === _ || e.match_length === F && e.strstart - e.match_start > 4096) && (e.match_length = F - 1)),
                    e.prev_length >= F && e.match_length <= e.prev_length) {
                        o = e.strstart + e.lookahead - F,
                            r = i._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - F),
                            e.lookahead -= e.prev_length - 1,
                            e.prev_length -= 2;
                        do {
                            ++e.strstart <= o && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + F - 1]) & e.hash_mask,
                                n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h],
                                e.head[e.ins_h] = e.strstart)
                        } while (0 != --e.prev_length);
                        if (e.match_available = 0,
                            e.match_length = F - 1,
                            e.strstart++,
                        r && (te(e, !1),
                        0 === e.strm.avail_out))
                            return G
                    } else if (e.match_available) {
                        if ((r = i._tr_tally(e, 0, e.window[e.strstart - 1])) && te(e, !1),
                            e.strstart++,
                            e.lookahead--,
                        0 === e.strm.avail_out)
                            return G
                    } else
                        e.match_available = 1,
                            e.strstart++,
                            e.lookahead--
                }
                return e.match_available && (r = i._tr_tally(e, 0, e.window[e.strstart - 1]),
                    e.match_available = 0),
                    e.insert = e.strstart < F - 1 ? e.strstart : F - 1,
                    t === d ? (te(e, !0),
                        0 === e.strm.avail_out ? Y : X) : e.last_lit && (te(e, !1),
                    0 === e.strm.avail_out) ? G : K
            }

            function se(e, t, n, r, o) {
                this.good_length = e,
                    this.max_lazy = t,
                    this.nice_length = n,
                    this.max_chain = r,
                    this.func = o
            }

            function ce(e) {
                var t;
                return e && e.state ? (e.total_in = e.total_out = 0,
                    e.data_type = T,
                    (t = e.state).pending = 0,
                    t.pending_out = 0,
                t.wrap < 0 && (t.wrap = -t.wrap),
                    t.status = t.wrap ? V : U,
                    e.adler = 2 === t.wrap ? 0 : 1,
                    t.last_flush = s,
                    i._tr_init(t),
                    h) : Z(e, y)
            }

            function fe(e) {
                var t = ce(e);
                return t === h && function (e) {
                    e.window_size = 2 * e.w_size,
                        J(e.head),
                        e.max_lazy_match = r[e.level].max_lazy,
                        e.good_match = r[e.level].good_length,
                        e.nice_match = r[e.level].nice_length,
                        e.max_chain_length = r[e.level].max_chain,
                        e.strstart = 0,
                        e.block_start = 0,
                        e.lookahead = 0,
                        e.insert = 0,
                        e.match_length = e.prev_length = F - 1,
                        e.match_available = 0,
                        e.ins_h = 0
                }(e.state),
                    t
            }

            function de(e, t, n, r, i, a) {
                if (!e)
                    return y;
                var u = 1;
                if (t === b && (t = 6),
                    r < 0 ? (u = 0,
                        r = -r) : r > 15 && (u = 2,
                        r -= 16),
                i < 1 || i > O || n !== k || r < 8 || r > 15 || t < 0 || t > 9 || a < 0 || a > E)
                    return Z(e, y);
                8 === r && (r = 9);
                var l = new function () {
                        this.strm = null,
                            this.status = 0,
                            this.pending_buf = null,
                            this.pending_buf_size = 0,
                            this.pending_out = 0,
                            this.pending = 0,
                            this.wrap = 0,
                            this.gzhead = null,
                            this.gzindex = 0,
                            this.method = k,
                            this.last_flush = -1,
                            this.w_size = 0,
                            this.w_bits = 0,
                            this.w_mask = 0,
                            this.window = null,
                            this.window_size = 0,
                            this.prev = null,
                            this.head = null,
                            this.ins_h = 0,
                            this.hash_size = 0,
                            this.hash_bits = 0,
                            this.hash_mask = 0,
                            this.hash_shift = 0,
                            this.block_start = 0,
                            this.match_length = 0,
                            this.prev_match = 0,
                            this.match_available = 0,
                            this.strstart = 0,
                            this.match_start = 0,
                            this.lookahead = 0,
                            this.prev_length = 0,
                            this.max_chain_length = 0,
                            this.max_lazy_match = 0,
                            this.level = 0,
                            this.strategy = 0,
                            this.good_match = 0,
                            this.nice_match = 0,
                            this.dyn_ltree = new o.Buf16(2 * j),
                            this.dyn_dtree = new o.Buf16(2 * (2 * I + 1)),
                            this.bl_tree = new o.Buf16(2 * (2 * A + 1)),
                            J(this.dyn_ltree),
                            J(this.dyn_dtree),
                            J(this.bl_tree),
                            this.l_desc = null,
                            this.d_desc = null,
                            this.bl_desc = null,
                            this.bl_count = new o.Buf16(M + 1),
                            this.heap = new o.Buf16(2 * R + 1),
                            J(this.heap),
                            this.heap_len = 0,
                            this.heap_max = 0,
                            this.depth = new o.Buf16(2 * R + 1),
                            J(this.depth),
                            this.l_buf = 0,
                            this.lit_bufsize = 0,
                            this.last_lit = 0,
                            this.d_buf = 0,
                            this.opt_len = 0,
                            this.static_len = 0,
                            this.matches = 0,
                            this.insert = 0,
                            this.bi_buf = 0,
                            this.bi_valid = 0
                    }
                ;
                return e.state = l,
                    l.strm = e,
                    l.wrap = u,
                    l.gzhead = null,
                    l.w_bits = r,
                    l.w_size = 1 << l.w_bits,
                    l.w_mask = l.w_size - 1,
                    l.hash_bits = i + 7,
                    l.hash_size = 1 << l.hash_bits,
                    l.hash_mask = l.hash_size - 1,
                    l.hash_shift = ~~((l.hash_bits + F - 1) / F),
                    l.window = new o.Buf8(2 * l.w_size),
                    l.head = new o.Buf16(l.hash_size),
                    l.prev = new o.Buf16(l.w_size),
                    l.lit_bufsize = 1 << i + 6,
                    l.pending_buf_size = 4 * l.lit_bufsize,
                    l.pending_buf = new o.Buf8(l.pending_buf_size),
                    l.d_buf = 1 * l.lit_bufsize,
                    l.l_buf = 3 * l.lit_bufsize,
                    l.level = t,
                    l.strategy = a,
                    l.method = n,
                    fe(e)
            }

            r = [new se(0, 0, 0, 0, function (e, t) {
                    var n = 65535;
                    for (n > e.pending_buf_size - 5 && (n = e.pending_buf_size - 5); ;) {
                        if (e.lookahead <= 1) {
                            if (ae(e),
                            0 === e.lookahead && t === s)
                                return G;
                            if (0 === e.lookahead)
                                break
                        }
                        e.strstart += e.lookahead,
                            e.lookahead = 0;
                        var r = e.block_start + n;
                        if ((0 === e.strstart || e.strstart >= r) && (e.lookahead = e.strstart - r,
                            e.strstart = r,
                            te(e, !1),
                        0 === e.strm.avail_out))
                            return G;
                        if (e.strstart - e.block_start >= e.w_size - L && (te(e, !1),
                        0 === e.strm.avail_out))
                            return G
                    }
                    return e.insert = 0,
                        t === d ? (te(e, !0),
                            0 === e.strm.avail_out ? Y : X) : (e.strstart > e.block_start && (te(e, !1),
                            e.strm.avail_out),
                            G)
                }
            ), new se(4, 4, 8, 4, ue), new se(4, 5, 16, 8, ue), new se(4, 6, 32, 32, ue), new se(4, 4, 16, 16, le), new se(8, 16, 32, 32, le), new se(8, 16, 128, 128, le), new se(8, 32, 128, 256, le), new se(32, 128, 258, 1024, le), new se(32, 258, 258, 4096, le)],
                t.deflateInit = function (e, t) {
                    return de(e, t, k, P, C, x)
                }
                ,
                t.deflateInit2 = de,
                t.deflateReset = fe,
                t.deflateResetKeep = ce,
                t.deflateSetHeader = function (e, t) {
                    return e && e.state ? 2 !== e.state.wrap ? y : (e.state.gzhead = t,
                        h) : y
                }
                ,
                t.deflate = function (e, t) {
                    var n, o, a, l;
                    if (!e || !e.state || t > p || t < 0)
                        return e ? Z(e, y) : y;
                    if (o = e.state,
                    !e.output || !e.input && 0 !== e.avail_in || o.status === q && t !== d)
                        return Z(e, 0 === e.avail_out ? v : y);
                    if (o.strm = e,
                        n = o.last_flush,
                        o.last_flush = t,
                    o.status === V)
                        if (2 === o.wrap)
                            e.adler = 0,
                                ne(o, 31),
                                ne(o, 139),
                                ne(o, 8),
                                o.gzhead ? (ne(o, (o.gzhead.text ? 1 : 0) + (o.gzhead.hcrc ? 2 : 0) + (o.gzhead.extra ? 4 : 0) + (o.gzhead.name ? 8 : 0) + (o.gzhead.comment ? 16 : 0)),
                                    ne(o, 255 & o.gzhead.time),
                                    ne(o, o.gzhead.time >> 8 & 255),
                                    ne(o, o.gzhead.time >> 16 & 255),
                                    ne(o, o.gzhead.time >> 24 & 255),
                                    ne(o, 9 === o.level ? 2 : o.strategy >= w || o.level < 2 ? 4 : 0),
                                    ne(o, 255 & o.gzhead.os),
                                o.gzhead.extra && o.gzhead.extra.length && (ne(o, 255 & o.gzhead.extra.length),
                                    ne(o, o.gzhead.extra.length >> 8 & 255)),
                                o.gzhead.hcrc && (e.adler = u(e.adler, o.pending_buf, o.pending, 0)),
                                    o.gzindex = 0,
                                    o.status = B) : (ne(o, 0),
                                    ne(o, 0),
                                    ne(o, 0),
                                    ne(o, 0),
                                    ne(o, 0),
                                    ne(o, 9 === o.level ? 2 : o.strategy >= w || o.level < 2 ? 4 : 0),
                                    ne(o, $),
                                    o.status = U);
                        else {
                            var g = k + (o.w_bits - 8 << 4) << 8;
                            g |= (o.strategy >= w || o.level < 2 ? 0 : o.level < 6 ? 1 : 6 === o.level ? 2 : 3) << 6,
                            0 !== o.strstart && (g |= N),
                                g += 31 - g % 31,
                                o.status = U,
                                re(o, g),
                            0 !== o.strstart && (re(o, e.adler >>> 16),
                                re(o, 65535 & e.adler)),
                                e.adler = 1
                        }
                    if (o.status === B)
                        if (o.gzhead.extra) {
                            for (a = o.pending; o.gzindex < (65535 & o.gzhead.extra.length) && (o.pending !== o.pending_buf_size || (o.gzhead.hcrc && o.pending > a && (e.adler = u(e.adler, o.pending_buf, o.pending - a, a)),
                                ee(e),
                                a = o.pending,
                            o.pending !== o.pending_buf_size));)
                                ne(o, 255 & o.gzhead.extra[o.gzindex]),
                                    o.gzindex++;
                            o.gzhead.hcrc && o.pending > a && (e.adler = u(e.adler, o.pending_buf, o.pending - a, a)),
                            o.gzindex === o.gzhead.extra.length && (o.gzindex = 0,
                                o.status = H)
                        } else
                            o.status = H;
                    if (o.status === H)
                        if (o.gzhead.name) {
                            a = o.pending;
                            do {
                                if (o.pending === o.pending_buf_size && (o.gzhead.hcrc && o.pending > a && (e.adler = u(e.adler, o.pending_buf, o.pending - a, a)),
                                    ee(e),
                                    a = o.pending,
                                o.pending === o.pending_buf_size)) {
                                    l = 1;
                                    break
                                }
                                l = o.gzindex < o.gzhead.name.length ? 255 & o.gzhead.name.charCodeAt(o.gzindex++) : 0,
                                    ne(o, l)
                            } while (0 !== l);
                            o.gzhead.hcrc && o.pending > a && (e.adler = u(e.adler, o.pending_buf, o.pending - a, a)),
                            0 === l && (o.gzindex = 0,
                                o.status = z)
                        } else
                            o.status = z;
                    if (o.status === z)
                        if (o.gzhead.comment) {
                            a = o.pending;
                            do {
                                if (o.pending === o.pending_buf_size && (o.gzhead.hcrc && o.pending > a && (e.adler = u(e.adler, o.pending_buf, o.pending - a, a)),
                                    ee(e),
                                    a = o.pending,
                                o.pending === o.pending_buf_size)) {
                                    l = 1;
                                    break
                                }
                                l = o.gzindex < o.gzhead.comment.length ? 255 & o.gzhead.comment.charCodeAt(o.gzindex++) : 0,
                                    ne(o, l)
                            } while (0 !== l);
                            o.gzhead.hcrc && o.pending > a && (e.adler = u(e.adler, o.pending_buf, o.pending - a, a)),
                            0 === l && (o.status = W)
                        } else
                            o.status = W;
                    if (o.status === W && (o.gzhead.hcrc ? (o.pending + 2 > o.pending_buf_size && ee(e),
                    o.pending + 2 <= o.pending_buf_size && (ne(o, 255 & e.adler),
                        ne(o, e.adler >> 8 & 255),
                        e.adler = 0,
                        o.status = U)) : o.status = U),
                    0 !== o.pending) {
                        if (ee(e),
                        0 === e.avail_out)
                            return o.last_flush = -1,
                                h
                    } else if (0 === e.avail_in && Q(t) <= Q(n) && t !== d)
                        return Z(e, v);
                    if (o.status === q && 0 !== e.avail_in)
                        return Z(e, v);
                    if (0 !== e.avail_in || 0 !== o.lookahead || t !== s && o.status !== q) {
                        var b = o.strategy === w ? function (e, t) {
                            for (var n; ;) {
                                if (0 === e.lookahead && (ae(e),
                                0 === e.lookahead)) {
                                    if (t === s)
                                        return G;
                                    break
                                }
                                if (e.match_length = 0,
                                    n = i._tr_tally(e, 0, e.window[e.strstart]),
                                    e.lookahead--,
                                    e.strstart++,
                                n && (te(e, !1),
                                0 === e.strm.avail_out))
                                    return G
                            }
                            return e.insert = 0,
                                t === d ? (te(e, !0),
                                    0 === e.strm.avail_out ? Y : X) : e.last_lit && (te(e, !1),
                                0 === e.strm.avail_out) ? G : K
                        }(o, t) : o.strategy === S ? function (e, t) {
                            for (var n, r, o, a, u = e.window; ;) {
                                if (e.lookahead <= D) {
                                    if (ae(e),
                                    e.lookahead <= D && t === s)
                                        return G;
                                    if (0 === e.lookahead)
                                        break
                                }
                                if (e.match_length = 0,
                                e.lookahead >= F && e.strstart > 0 && (r = u[o = e.strstart - 1]) === u[++o] && r === u[++o] && r === u[++o]) {
                                    a = e.strstart + D;
                                    do {
                                    } while (r === u[++o] && r === u[++o] && r === u[++o] && r === u[++o] && r === u[++o] && r === u[++o] && r === u[++o] && r === u[++o] && o < a);
                                    e.match_length = D - (a - o),
                                    e.match_length > e.lookahead && (e.match_length = e.lookahead)
                                }
                                if (e.match_length >= F ? (n = i._tr_tally(e, 1, e.match_length - F),
                                    e.lookahead -= e.match_length,
                                    e.strstart += e.match_length,
                                    e.match_length = 0) : (n = i._tr_tally(e, 0, e.window[e.strstart]),
                                    e.lookahead--,
                                    e.strstart++),
                                n && (te(e, !1),
                                0 === e.strm.avail_out))
                                    return G
                            }
                            return e.insert = 0,
                                t === d ? (te(e, !0),
                                    0 === e.strm.avail_out ? Y : X) : e.last_lit && (te(e, !1),
                                0 === e.strm.avail_out) ? G : K
                        }(o, t) : r[o.level].func(o, t);
                        if (b !== Y && b !== X || (o.status = q),
                        b === G || b === Y)
                            return 0 === e.avail_out && (o.last_flush = -1),
                                h;
                        if (b === K && (t === c ? i._tr_align(o) : t !== p && (i._tr_stored_block(o, 0, 0, !1),
                        t === f && (J(o.head),
                        0 === o.lookahead && (o.strstart = 0,
                            o.block_start = 0,
                            o.insert = 0))),
                            ee(e),
                        0 === e.avail_out))
                            return o.last_flush = -1,
                                h
                    }
                    return t !== d ? h : o.wrap <= 0 ? m : (2 === o.wrap ? (ne(o, 255 & e.adler),
                        ne(o, e.adler >> 8 & 255),
                        ne(o, e.adler >> 16 & 255),
                        ne(o, e.adler >> 24 & 255),
                        ne(o, 255 & e.total_in),
                        ne(o, e.total_in >> 8 & 255),
                        ne(o, e.total_in >> 16 & 255),
                        ne(o, e.total_in >> 24 & 255)) : (re(o, e.adler >>> 16),
                        re(o, 65535 & e.adler)),
                        ee(e),
                    o.wrap > 0 && (o.wrap = -o.wrap),
                        0 !== o.pending ? h : m)
                }
                ,
                t.deflateEnd = function (e) {
                    var t;
                    return e && e.state ? (t = e.state.status) !== V && t !== B && t !== H && t !== z && t !== W && t !== U && t !== q ? Z(e, y) : (e.state = null,
                        t === U ? Z(e, g) : h) : y
                }
                ,
                t.deflateSetDictionary = function (e, t) {
                    var n, r, i, u, l, s, c, f, d = t.length;
                    if (!e || !e.state)
                        return y;
                    if (2 === (u = (n = e.state).wrap) || 1 === u && n.status !== V || n.lookahead)
                        return y;
                    for (1 === u && (e.adler = a(e.adler, t, d, 0)),
                             n.wrap = 0,
                         d >= n.w_size && (0 === u && (J(n.head),
                             n.strstart = 0,
                             n.block_start = 0,
                             n.insert = 0),
                             f = new o.Buf8(n.w_size),
                             o.arraySet(f, t, d - n.w_size, n.w_size, 0),
                             t = f,
                             d = n.w_size),
                             l = e.avail_in,
                             s = e.next_in,
                             c = e.input,
                             e.avail_in = d,
                             e.next_in = 0,
                             e.input = t,
                             ae(n); n.lookahead >= F;) {
                        r = n.strstart,
                            i = n.lookahead - (F - 1);
                        do {
                            n.ins_h = (n.ins_h << n.hash_shift ^ n.window[r + F - 1]) & n.hash_mask,
                                n.prev[r & n.w_mask] = n.head[n.ins_h],
                                n.head[n.ins_h] = r,
                                r++
                        } while (--i);
                        n.strstart = r,
                            n.lookahead = F - 1,
                            ae(n)
                    }
                    return n.strstart += n.lookahead,
                        n.block_start = n.strstart,
                        n.insert = n.lookahead,
                        n.lookahead = 0,
                        n.match_length = n.prev_length = F - 1,
                        n.match_available = 0,
                        e.next_in = s,
                        e.input = c,
                        e.avail_in = l,
                        n.wrap = u,
                        h
                }
                ,
                t.deflateInfo = "pako deflate (from Nodeca project)"
        }, //421 -15
        function (e, t, n) {
            "use strict";
            var r = n(3)
                ,
                o = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]
                ,
                i = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78]
                ,
                a = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0]
                ,
                u = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
            e.exports = function (e, t, n, l, s, c, f, d) {
                var p, h, m, y, g, v, b, _, w, S = d.bits, E = 0, x = 0, T = 0, k = 0, O = 0, P = 0, C = 0, R = 0,
                    I = 0, A = 0, j = null, M = 0, F = new r.Buf16(16), D = new r.Buf16(16), L = null, N = 0;
                for (E = 0; E <= 15; E++)
                    F[E] = 0;
                for (x = 0; x < l; x++)
                    F[t[n + x]]++;
                for (O = S,
                         k = 15; k >= 1 && 0 === F[k]; k--)
                    ;
                if (O > k && (O = k),
                0 === k)
                    return s[c++] = 20971520,
                        s[c++] = 20971520,
                        d.bits = 1,
                        0;
                for (T = 1; T < k && 0 === F[T]; T++)
                    ;
                for (O < T && (O = T),
                         R = 1,
                         E = 1; E <= 15; E++)
                    if (R <<= 1,
                    (R -= F[E]) < 0)
                        return -1;
                if (R > 0 && (0 === e || 1 !== k))
                    return -1;
                for (D[1] = 0,
                         E = 1; E < 15; E++)
                    D[E + 1] = D[E] + F[E];
                for (x = 0; x < l; x++)
                    0 !== t[n + x] && (f[D[t[n + x]]++] = x);
                if (0 === e ? (j = L = f,
                    v = 19) : 1 === e ? (j = o,
                    M -= 257,
                    L = i,
                    N -= 257,
                    v = 256) : (j = a,
                    L = u,
                    v = -1),
                    A = 0,
                    x = 0,
                    E = T,
                    g = c,
                    P = O,
                    C = 0,
                    m = -1,
                    y = (I = 1 << O) - 1,
                1 === e && I > 852 || 2 === e && I > 592)
                    return 1;
                for (; ;) {
                    b = E - C,
                        f[x] < v ? (_ = 0,
                            w = f[x]) : f[x] > v ? (_ = L[N + f[x]],
                            w = j[M + f[x]]) : (_ = 96,
                            w = 0),
                        p = 1 << E - C,
                        T = h = 1 << P;
                    do {
                        s[g + (A >> C) + (h -= p)] = b << 24 | _ << 16 | w | 0
                    } while (0 !== h);
                    for (p = 1 << E - 1; A & p;)
                        p >>= 1;
                    if (0 !== p ? (A &= p - 1,
                        A += p) : A = 0,
                        x++,
                    0 == --F[E]) {
                        if (E === k)
                            break;
                        E = t[n + f[x]]
                    }
                    if (E > O && (A & y) !== m) {
                        for (0 === C && (C = O),
                                 g += T,
                                 R = 1 << (P = E - C); P + C < k && !((R -= F[P + C]) <= 0);)
                            P++,
                                R <<= 1;
                        if (I += 1 << P,
                        1 === e && I > 852 || 2 === e && I > 592)
                            return 1;
                        s[m = A & y] = O << 24 | P << 16 | g - c | 0
                    }
                }
                return 0 !== A && (s[g + A] = E - C << 24 | 64 << 16 | 0),
                    d.bits = O,
                    0
            }
        }, // 426 -16
        function (e, t, n) {
            "use strict";
            e.exports = {
                API_HOST: "https://api.waitwaitpay.com",
                CHANNEL_ID: "qq_web",
                PRODUCTION: !0
            }
        }, // 59-17
        function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
                t.default = function (e, t) {
                    var n = (0,
                        o.default)(e).map(function (n) {
                        return (0,
                            r.default)(n, e[n], t)
                    })
                        , a = i.default.apply(void 0, function (e) {
                        if (Array.isArray(e)) {
                            for (var t = 0, n = Array(e.length); t < e.length; t++)
                                n[t] = e[t];
                            return n
                        }
                        return Array.from(e)
                    }(n));
                    return function (e, t) {
                        return a(e, t)
                    }
                }
            ;
            // var r = a(n(193))
            //     , o = a(n(419))
            //     , i = a(n(420));

            function a(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
        }, // 418-18
    ]
)
var text = 'MDFhNzE5YmUyOXic5VvbcuO4Ef0aPVqFO7ofJdvKSyoPyQe4QFw82rElx5Jn\n' +
    'd/br0wCvtkSJHsvOplI7y6IIXhoN4JzTh/TMLmdC7PZu/7KjnZlc0Hb7Pe+K\n' +
    'a9o+xt3O3ceuqWt4jruXh31zvNzkYb1rf+tlfWgd6gOcMcEkMqXri8PabZ7W\n' +
    'm/u79gTaWuSAApnsHvGw3dyv9y+heToXfK6s5lw1zW4/aJV8LoRAy+vGjXsc\n' +
    'BH1rZgs1Q9qxMxCzJc6uaWtntzpv8SYfX4p8Tr2zvM1NKGdAt4PZLc4WZoaY\n' +
    '77OE2WJVLsTZsuzg9Wy5KEcWM7QzgX3y1pu7Z7dvAmHzpvdP37abPjgjGTeS\n' +
    '48xeGyklItfdDX6P6/tvTVLNnPJnTd2w2748+zhMXwyOQ/IshChZVAo4CBmT\n' +
    'iEqEKsjY3bNyu0hRbb7Xl16xueIaeZO3ilrCqcRNSlkbvls/uvXd7uXx0T3/\n' +
    'rO+6eXl4qFv9ev/z7s04qZxfWJRElwe1t3I/7u+ente+OVkwM2dNKvbuuZm6\n' +
    '2JwbAs3O3eC2NFTLGajmtjSWFCrUw2byUxa3/RPrGBbUQShNKwGynL8qrdOm\n' +
    'AtzQVJjP5138nqbB/fb5bYfbZsrTfbx7eX7omr7t90+7sruif+vH+zllc5//\n' +
    'f3I/5377SEcZzYaVpTysJGVqFU1AmzDwZFkVU+AiGWkZWluBlzbMf3u6754Y\n' +
    'aLW6je9jERwe+3h2dz/cwzrcbba/12fsn19iu/Lp6Y80Te5+bF/8t9hm/2DV\n' +
    '55sqV9Ga1EBhhcoICUJr9ByVlMpjv9abW9FceXp6WNPOqzz9udt9606lVf/w\n' +
    'Zs5czxDyiNBILVg5QiPC2oGolx2DeX3OIp9MF9qbmb4Z6VIXx6BvfRjtZZRD\n' +
    'v33Z7AeLPD/kddv+51MfLS2HAYK+feg+/rG/TMfo+KuhMAxRGjOOvsYCaIKf\n' +
    '0+BrpUIByljG7SgIc0En0gMJ86U9gsb/XO//pKj/5p5D3DR9QlYWFC3SZVl3\n' +
    'N3k/rzU5w7KyFrTKTIEam88fQ1iEoxDLiTQMHwDTAFf1nDGTWec4rlZemRQc\n' +
    '/acrgVp49EGFgMHblFTsQ3mDq4T2yiDYY7D6TBm4/8XuX8+gR8XPA1iw78FX\n' +
    'upPKceWd2wKTDXZyiQPsLBMa+ARcpOtzl1clCSrn5wJIiY42KtHGS625ZkpU\n' +
    '6ILiUokkVbLBxMQrVP40UtIiuDxSehCoInG30zyl4JOSRkaQkYAcre/n2Wmk\n' +
    'bNf2h9ESP4yWw1BOICb+FxDzSOfeIiYIQSBn4ARmguaWSS16vXYUNBUAjoKl\n' +
    'NIgjihVNCdxkUZlVBRTJYvolkft0OwP9BRJVSm3Mcfy0cw4MxRh+ykp564WW\n' +
    'lY2VJWkimGUxCmeVtJzBGH5mXaqIasZk6Tuy8+lgSeXNF6pRMUDUciHaZmgX\n' +
    '9h/Lv19NgddOu0O+E15PhtdcKa79EYQl3M3A+s3RhCqjtSsXaOqJ0Jg3NFzt\n' +
    'T5t/LvJPGn9NXaCfuYFSIzSFRaeUk3Vuvc0bfRqSOfLLQzLjIRH0QnIipUp7\n' +
    'b1AJRJ8CI5SW/XI4Dck06YLbVO4UJC8z1VPviUORl2GFPO41WJ2DKtom5Cq4\n' +
    'SqP2pFC4FFFDRK2iYhKkChNDvYjOxrmcELEI0oOmgpUlYB5Qc+aNS4IQF1mq\n' +
    '/Nfznb0g39XY+nbgJ9QPeEku/NCs4hwM8d84/aEG4LQkTrMfIDLNJRUF4yQI\n' +
    'JM8VlQwUlRyzb3j2HzIsLgq4Y7YaMoRAkceKsK/BSiw6GQsyTmE8EC3HvyY9\n' +
    'Lo3mBlDYMT+GwrUwxnteKqWM855xCCH5yB2AI7WQpOda9lk7rBsEZWuU90YT\n' +
    '8fksh0dIDsZIrhPwkPMPq84V6WsD3hPZmWE0xWEqN6P+T3JWsg7QhUpbV6ov\n' +
    'o1qt8LmkR5EScYn2Z+G7mtYyy+WZ3nBgac1EuFi1pLfMlAjdz4XuGHJAmKcp\n' +
    'karPy1Oii44bHnTktkJJVXFiRsegae1WIMNUP4dCoST+KiHCIcG8E6r755+0\n' +
    'cuRXgfGRHh3AsbEMQZ8oRxRnRpi+Uj4Kx4jaMquV0FaM4rEWShJyWwAGR/FY\n' +
    'Z129qNfsbVlSqhT+q6ZfCxxAL0yRtWWZLvO/X69SeK7HCK3tdcFuS8WV6Wfk\n' +
    'ELthrg0fx24wUvEgE0G18y5JbavoBEmVYKx0ptcmh9hNRCaPej7vTNrno/kx\n' +
    'g8eeLVl0NqRQvatkGeD87apYQBOnhMkPW5algbdD6pjmIFGKKeM5p5A5k5B5\n' +
    'QsZ/zV8aUMDd2m83DQ2U+qUAOHRQfttBea5zluVnf3KhAexooHCGPWNHCXZ5\n' +
    'oK+cQJ6o4nHI0fiKOcREKkYnrhXV7hOB/mWz3m7OQP0keW7OOza05ZUzikoz\n' +
    'SlrgqlKVY54pUCAcUC/ixKhPlEHZYbFZpSzaSQRFUCxVmbpH1/ir9dgCQX6p\n' +
    'dIIVRssmYQQAoCRp6kwyGFh+z0ddJ2yCMNUm/POPn+OF3mEnMPcSbIMDOVCT\n' +
    'reran+3e+b2fhw+mx6vMt0Ge4Gj9puXzrUN9lqgFEnvwcZ6WoK2yuh+qo0Qt\n' +
    'iIG5kYZW9+j7buIazg0DI6iiOErUqqAbH6BsgUKarX3TQJc3XlCxE/Gm2Ill\n' +
    'DgAO5LnJd6hdK4JnuP0AYzMrefko4AhHczZXsjVHj7yXcVw7qaSsXOW9tpHK\n' +
    'UeejMN4bYvBqjKPlXFqu2rY3FD2eri8gZA7vMREPbtvx3NGxa8j6aFV2/aoq\n' +
    'Q3jlL54Y9HLhFCru0lpwksJ9t+34LtZVHXPyrrwqbGq7AipXZUt15oX4XH6/\n' +
    'PLFq5hUjfIDEFVjhJSeaYlUFzNFxP7WC8o8Di+xXSfUsltFWMeaNEilKQcSK\n' +
    'wYZcQ1C9FzUmYWFqvPfVqXBPFUd2EvXb5LTiBAXSx1heV2hvHBG/0xwFm+on\n' +
    'nnNATwc6xaqNSVQevVA+SiBwpzqlErIiHKfJkcLUhH7UVYZDv/NIsK4yUero\n' +
    'ZKLKx4L23tEMjpA/4LC8muorf+ZbyaMpVjYqmqrBEjtaWYmKWWuCI8IRVkyN\n' +
    '+oxLQbKHFQvuBMnWKWc9ReYmgtmC2xkCWXufdnygPpkVcIZcEDceFmucsMV1\n' +
    '+dYKs0ijwcyYevt6nCkM3n+YlfG/qbo4a8QrFpbIj60ZoPhrdaaXcvDhQX0d\n' +
    'zn5J3B0M+pt8jtrjNZcMAKMFu/8tIaiMUj25HOpAzkj+gFD9ij8mBIGkID3M\n' +
    'ouy+pjkUgrQW0WjLOSM5NWbZLMr8yupgWSYgTYNFqek7O7SV/LBqv9VYXPY1\n' +
    'srCMDd2N13KPCzMq9yJ4QIzKG26MwkoZqlBdrCChFsj6SfQeuXeYk1LK5AX3\n' +
    '1iL+xE8Zj8m+UVv9pOwbfa3cSfwCVYQgjcd+3b9WRnwt+w5mAWVoeVNSha2t\n' +
    '8mZe2Hzn7uYNkOXXFf+6yi/6GzS5zr/wL+/gd7Z7sWRqy36ZjxXLPpv3ueit\n' +
    '7Zzppjyfm0/QlIrFSLyMSlvLA3IpBQoiayWovqJKciLfXdCsmaItqG416FnQ\n' +
    'QRJshUgBJ5WMjMkrr6qvE0JqSrCi4uAts05XydGUDQwJcpVkilElyiYG+xF5\n' +
    'OUVcGnA8gWdKySr6oBPV2ELZZB0lmIupBlimKrcZDbR8qkj0xAZeFi3++vNF\n' +
    'nYOHFfRt4+pSMx2UjDzykELimJhDY2x01kbp9dSknjCz9LKBLOw+FjJZR5xL\n' +
    '9gG7f9TZOq123iR8gvOV19hXS54J65orkiKy+4rhUPUIqZk0Z/7KAyzpHqmt\n' +
    '4YCj7hfnpO4tCA6qfV1+oHloXGs+q1+SHx6pva63xFmTnBk4oKVpwJcf+piO\n' +
    'GcNGTS+BZvSPPCSti/w9qFCaccOjiCoKlBptrALjfZH7PhV0PkufroKM/Jj5\n' +
    'dUL8nB9M0s1soH66jwuxlHHLIpVVKYhMMbCWDdxld5KiZkux6rQO7V+xaZ/g\n' +
    'ZalZw5Mafqd48TdQxQarzS/9+suD8dZzMsZ+hjWWMCUgMaBQJ+WUYrayiQRM\n' +
    'SDJYN5W8LiZjpogYb5w1QXuZP42wyLyXKhL/JgvaOe4mxvw1bo7XgIwG3Doe\n' +
    'RHCVUdzqgCazr7YZH/4SIgaswGC4rKjslYpULQvcVBUnuSAI9Ka+ezwjYs4F\n' +
    'OsnME+iStxAqilU6xX2gMjxKY8BoYNZOzej/o4L5ev1y/gvPQQbatm9udxdi\n' +
    'ci8P+7sfcRO2bZqGIPfvl7jbvzJ3ktWu8vLKWaWuVIpwBcpUVxEqKm1UDEn3\n' +
    'ePY9/vx9+zzg5I47Xp6fI6XmqfsT3CZp++3ePZTDrw2D+njJ54Cdqaf25j9f\n' +
    '8zJh\n'
console.log(decode_func.decodeData(text))
