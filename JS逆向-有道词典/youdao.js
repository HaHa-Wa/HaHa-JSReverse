function youdao (e) {
    // var t = n.md5(navigator.appVersion)
    var r = "" + (new Date).getTime();
    var i = r + parseInt(10 * Math.random(), 10);
    return {
        ts: r,
        // bv: t,
        salt: i,
        sign: "fanyideskweb" + e + i + "Tbh5E8=q6U3EXe+&L[4c@"
    }
};