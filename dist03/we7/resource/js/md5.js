!function(n) {
    function v(n, r) {
        var t = (65535 & n) + (65535 & r);
        return (n >> 16) + (r >> 16) + (t >> 16) << 16 | 65535 & t;
    }
    function f(n, r, t, e, o, u) {
        return v((c = v(v(r, n), v(e, u))) << (f = o) | c >>> 32 - f, t);
        var c, f;
    }
    function g(n, r, t, e, o, u, c) {
        return f(r & t | ~r & e, n, r, o, u, c);
    }
    function l(n, r, t, e, o, u, c) {
        return f(r & e | t & ~e, n, r, o, u, c);
    }
    function d(n, r, t, e, o, u, c) {
        return f(r ^ t ^ e, n, r, o, u, c);
    }
    function C(n, r, t, e, o, u, c) {
        return f(t ^ (r | ~e), n, r, o, u, c);
    }
    function i(n, r) {
        var t, e, o, u, c;
        n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r;
        var f = 1732584193, i = -271733879, a = -1732584194, h = 271733878;
        for (t = 0; t < n.length; t += 16) i = C(i = C(i = C(i = C(i = d(i = d(i = d(i = d(i = l(i = l(i = l(i = l(i = g(i = g(i = g(i = g(o = i, a = g(u = a, h = g(c = h, f = g(e = f, i, a, h, n[t], 7, -680876936), i, a, n[t + 1], 12, -389564586), f, i, n[t + 2], 17, 606105819), h, f, n[t + 3], 22, -1044525330), a = g(a, h = g(h, f = g(f, i, a, h, n[t + 4], 7, -176418897), i, a, n[t + 5], 12, 1200080426), f, i, n[t + 6], 17, -1473231341), h, f, n[t + 7], 22, -45705983), a = g(a, h = g(h, f = g(f, i, a, h, n[t + 8], 7, 1770035416), i, a, n[t + 9], 12, -1958414417), f, i, n[t + 10], 17, -42063), h, f, n[t + 11], 22, -1990404162), a = g(a, h = g(h, f = g(f, i, a, h, n[t + 12], 7, 1804603682), i, a, n[t + 13], 12, -40341101), f, i, n[t + 14], 17, -1502002290), h, f, n[t + 15], 22, 1236535329), a = l(a, h = l(h, f = l(f, i, a, h, n[t + 1], 5, -165796510), i, a, n[t + 6], 9, -1069501632), f, i, n[t + 11], 14, 643717713), h, f, n[t], 20, -373897302), a = l(a, h = l(h, f = l(f, i, a, h, n[t + 5], 5, -701558691), i, a, n[t + 10], 9, 38016083), f, i, n[t + 15], 14, -660478335), h, f, n[t + 4], 20, -405537848), a = l(a, h = l(h, f = l(f, i, a, h, n[t + 9], 5, 568446438), i, a, n[t + 14], 9, -1019803690), f, i, n[t + 3], 14, -187363961), h, f, n[t + 8], 20, 1163531501), a = l(a, h = l(h, f = l(f, i, a, h, n[t + 13], 5, -1444681467), i, a, n[t + 2], 9, -51403784), f, i, n[t + 7], 14, 1735328473), h, f, n[t + 12], 20, -1926607734), a = d(a, h = d(h, f = d(f, i, a, h, n[t + 5], 4, -378558), i, a, n[t + 8], 11, -2022574463), f, i, n[t + 11], 16, 1839030562), h, f, n[t + 14], 23, -35309556), a = d(a, h = d(h, f = d(f, i, a, h, n[t + 1], 4, -1530992060), i, a, n[t + 4], 11, 1272893353), f, i, n[t + 7], 16, -155497632), h, f, n[t + 10], 23, -1094730640), a = d(a, h = d(h, f = d(f, i, a, h, n[t + 13], 4, 681279174), i, a, n[t], 11, -358537222), f, i, n[t + 3], 16, -722521979), h, f, n[t + 6], 23, 76029189), a = d(a, h = d(h, f = d(f, i, a, h, n[t + 9], 4, -640364487), i, a, n[t + 12], 11, -421815835), f, i, n[t + 15], 16, 530742520), h, f, n[t + 2], 23, -995338651), a = C(a, h = C(h, f = C(f, i, a, h, n[t], 6, -198630844), i, a, n[t + 7], 10, 1126891415), f, i, n[t + 14], 15, -1416354905), h, f, n[t + 5], 21, -57434055), a = C(a, h = C(h, f = C(f, i, a, h, n[t + 12], 6, 1700485571), i, a, n[t + 3], 10, -1894986606), f, i, n[t + 10], 15, -1051523), h, f, n[t + 1], 21, -2054922799), a = C(a, h = C(h, f = C(f, i, a, h, n[t + 8], 6, 1873313359), i, a, n[t + 15], 10, -30611744), f, i, n[t + 6], 15, -1560198380), h, f, n[t + 13], 21, 1309151649), a = C(a, h = C(h, f = C(f, i, a, h, n[t + 4], 6, -145523070), i, a, n[t + 11], 10, -1120210379), f, i, n[t + 2], 15, 718787259), h, f, n[t + 9], 21, -343485551), 
        f = v(f, e), i = v(i, o), a = v(a, u), h = v(h, c);
        return [ f, i, a, h ];
    }
    function a(n) {
        var r, t = "", e = 32 * n.length;
        for (r = 0; r < e; r += 8) t += String.fromCharCode(n[r >> 5] >>> r % 32 & 255);
        return t;
    }
    function h(n) {
        var r, t = [];
        for (t[(n.length >> 2) - 1] = void 0, r = 0; r < t.length; r += 1) t[r] = 0;
        var e = 8 * n.length;
        for (r = 0; r < e; r += 8) t[r >> 5] |= (255 & n.charCodeAt(r / 8)) << r % 32;
        return t;
    }
    function e(n) {
        var r, t, e = "0123456789abcdef", o = "";
        for (t = 0; t < n.length; t += 1) r = n.charCodeAt(t), o += e.charAt(r >>> 4 & 15) + e.charAt(15 & r);
        return o;
    }
    function t(n) {
        return unescape(encodeURIComponent(n));
    }
    function o(n) {
        return a(i(h(r = t(n)), 8 * r.length));
        var r;
    }
    function u(n, r) {
        return function(n, r) {
            var t, e, o = h(n), u = [], c = [];
            for (u[15] = c[15] = void 0, 16 < o.length && (o = i(o, 8 * n.length)), t = 0; t < 16; t += 1) u[t] = 909522486 ^ o[t], 
            c[t] = 1549556828 ^ o[t];
            return e = i(u.concat(h(r)), 512 + 8 * r.length), a(i(c.concat(e), 640));
        }(t(n), t(r));
    }
    module.exports = function(n, r, t) {
        return r ? t ? u(r, n) : e(u(r, n)) : t ? o(n) : e(o(n));
    };
}();