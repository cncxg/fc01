function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

function getQuery(e) {
    var t = [];
    if (-1 != e.indexOf("?")) for (var a = e.split("?")[1].split("&"), n = 0; n < a.length; n++) a[n].split("=")[0] && unescape(a[n].split("=")[1]) && (t[n] = {
        name: a[n].split("=")[0],
        value: unescape(a[n].split("=")[1])
    });
    return t;
}

function getUrlParam(e, t) {
    var a = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"), n = e.split("?")[1].match(a);
    return null != n ? unescape(n[2]) : null;
}

function getSign(e, t, a) {
    var n = require("underscore.js"), r = require("md5.js"), i = "", o = getUrlParam(e, "sign");
    if (o || t && t.sign) return !1;
    if (e && (i = getQuery(e)), t) {
        var s = [];
        for (var u in t) u && t[u] && (s = s.concat({
            name: u,
            value: t[u]
        }));
        i = i.concat(s);
    }
    i = n.sortBy(i, "name"), i = n.uniq(i, !0, "name");
    for (var c = "", d = 0; d < i.length; d++) i[d] && i[d].name && i[d].value && (c += i[d].name + "=" + i[d].value, 
    d < i.length - 1 && (c += "&"));
    return a = a || getApp().siteInfo.token, o = r(c + a);
}

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _base = require("base64"), _md = require("md5"), _md2 = _interopRequireDefault(_md), util = {};

util.base64Encode = function(e) {
    return (0, _base.base64_encode)(e);
}, util.base64Decode = function(e) {
    return (0, _base.base64_decode)(e);
}, util.md5 = function(e) {
    return (0, _md2.default)(e);
}, util.url = function(e, t) {
    var a = getApp(), n = a.siteInfo.siteroot + "?i=" + a.siteInfo.uniacid + "&t=" + a.siteInfo.multiid + "&v=" + a.siteInfo.version + "&from=wxapp&";
    if (e && ((e = e.split("/"))[0] && (n += "c=" + e[0] + "&"), e[1] && (n += "a=" + e[1] + "&"), 
    e[2] && (n += "do=" + e[2] + "&")), t && "object" === (void 0 === t ? "undefined" : _typeof(t))) for (var r in t) r && t.hasOwnProperty(r) && t[r] && (n += r + "=" + t[r] + "&");
    return n;
}, util.getSign = function(e, t, a) {
    return getSign(e, t, a);
}, util.request = function(e) {
    require("underscore.js");
    var t, a = require("md5.js"), n = getApp();
    (e = e || {}).cachetime = e.cachetime ? e.cachetime : 0, e.showLoading = void 0 === e.showLoading || e.showLoading;
    var r = wx.getStorageSync("userInfo").sessionid, i = e.url;
    if (-1 == i.indexOf("http://") && -1 == i.indexOf("https://") && (i = util.url(i)), 
    getUrlParam(i, "state") || e.data && e.data.state || !r || (i = i + "&state=we7sid-" + r), 
    !e.data || !e.data.m) {
        var o = getCurrentPages();
        o.length && (o = o[getCurrentPages().length - 1]) && o.__route__ && (i = i + "&m=" + o.__route__.split("/")[0]);
    }
    var s = getSign(i, e.data);
    if (s && (i = i + "&sign=" + s), !i) return !1;
    if (wx.showNavigationBarLoading(), e.showLoading && util.showLoading(), e.cachetime) {
        var u = a(i), c = wx.getStorageSync(u), d = Date.parse(new Date());
        if (c && c.data) {
            if (c.expire > d) return e.complete && "function" == typeof e.complete && e.complete(c), 
            e.success && "function" == typeof e.success && e.success(c), wx.hideLoading(), wx.hideNavigationBarLoading(), 
            !0;
            wx.removeStorageSync(u);
        }
    }
    wx.request((t = {
        url: i,
        data: e.data ? e.data : {},
        header: e.header ? e.header : {},
        method: e.method ? e.method : "GET"
    }, _defineProperty(t, "header", {
        "content-type": "application/x-www-form-urlencoded"
    }), _defineProperty(t, "success", function(t) {
        if (wx.hideNavigationBarLoading(), wx.hideLoading(), t.data.errno) {
            if ("41009" == t.data.errno) return wx.setStorageSync("userInfo", ""), void util.getUserInfo(function() {
                util.request(e);
            });
            if (e.fail && "function" == typeof e.fail) e.fail(t); else if (t.data.message) {
                if (null != t.data.data && t.data.data.redirect) a = t.data.data.redirect; else var a = "";
                n.util.message(t.data.message, a, "error");
            }
        } else if (e.success && "function" == typeof e.success && e.success(t), e.cachetime) {
            var r = {
                data: t.data,
                expire: d + 1e3 * e.cachetime
            };
            wx.setStorageSync(u, r);
        }
    }), _defineProperty(t, "fail", function(t) {
        wx.hideNavigationBarLoading(), wx.hideLoading();
        var a = require("md5.js")(i), n = wx.getStorageSync(a);
        if (n && n.data) return e.success && "function" == typeof e.success && e.success(n), 
        !0;
        e.fail && "function" == typeof e.fail && e.fail(t);
    }), _defineProperty(t, "complete", function(t) {
        e.complete && "function" == typeof e.complete && e.complete(t);
    }), t));
}, util.getUserInfo = function(e) {
    var t = function() {
        var t = {
            sessionid: "",
            wxInfo: "",
            memberInfo: ""
        };
        wx.login({
            success: function(a) {
                util.request({
                    url: "auth/session/openid",
                    data: {
                        code: a.code
                    },
                    cachetime: 0,
                    success: function(a) {
                        a.data.errno || (t.sessionid = a.data.data.sessionid, wx.setStorageSync("userInfo", t), 
                        wx.getUserInfo({
                            success: function(a) {
                                t.wxInfo = a.userInfo, wx.setStorageSync("userInfo", t), util.request({
                                    url: "auth/session/userinfo",
                                    data: {
                                        signature: a.signature,
                                        rawData: a.rawData,
                                        iv: a.iv,
                                        encryptedData: a.encryptedData
                                    },
                                    method: "POST",
                                    header: {
                                        "content-type": "application/json"
                                    },
                                    cachetime: "0",
                                    success: function(a) {
                                        a.data.errno || (wx.setStorageSync("uid", a.data.data.uid), wx.setStorageSync("uniacid", a.data.data.uniacid), 
                                        wx.getStorageSync("house_id") > 0 && !(wx.getStorageSync("re_id") > 0) || util.request({
                                            url: "entry/wxapp/login",
                                            data: {
                                                m: "monaiapp_house",
                                                uniacid: wx.getStorageSync("uniacid"),
                                                re_id: wx.getStorageSync("re_id"),
                                                uid: wx.getStorageSync("uid")
                                            },
                                            cachetime: "0",
                                            success: function(e) {
                                                e.data.errno > 8 && e.data.errno < 32 && (wx.setStorageSync("house_id", e.data.data), 
                                                wx.showModal({
                                                    content: e.data.message,
                                                    showCancel: !1,
                                                    confirmColor: "#cc0000"
                                                }));
                                            }
                                        })), "function" == typeof e && e(t);
                                    }
                                });
                            },
                            fail: function() {
                                "function" == typeof e && e(t);
                            },
                            complete: function() {}
                        }));
                    }
                });
            },
            fail: function() {}
        });
    }, a = wx.getStorageSync("userInfo");
    a.sessionid ? wx.checkSession({
        success: function() {
            "function" == typeof e && e(a);
        },
        fail: function() {
            a.sessionid = "", wx.removeStorageSync("userInfo"), t();
        }
    }) : t();
}, util.navigateBack = function(e) {
    var t = e.delta ? e.delta : 1;
    if (e.data) {
        var a = getCurrentPages(), n = a[a.length - (t + 1)];
        n.pageForResult ? n.pageForResult(e.data) : n.setData(e.data);
    }
    wx.navigateBack({
        delta: t,
        success: function(t) {
            "function" == typeof e.success && e.success(t);
        },
        fail: function(t) {
            "function" == typeof e.fail && e.fail(t);
        },
        complete: function() {
            "function" == typeof e.complete && e.complete();
        }
    });
}, util.footer = function(e) {
    var t = e, a = getApp().tabBar;
    for (var n in a.list) a.list[n].pageUrl = a.list[n].pagePath.replace(/(\?|#)[^"]*/g, "");
    t.setData({
        tabBar: a,
        "tabBar.thisurl": t.__route__
    });
}, util.message = function(e, t, a) {
    if (!e) return !0;
    if ("object" == (void 0 === e ? "undefined" : _typeof(e)) && (t = e.redirect, a = e.type, 
    e = e.title), t) {
        var n = t.substring(0, 9), r = "", i = "";
        "navigate:" == n ? (i = "navigateTo", r = t.substring(9)) : "redirect:" == n ? (i = "redirectTo", 
        r = t.substring(9)) : (r = t, i = "redirectTo");
    }
    a || (a = "success"), "success" == a ? wx.showToast({
        title: e,
        icon: "success",
        duration: 2e3,
        mask: !!r,
        complete: function() {
            r && setTimeout(function() {
                wx[i]({
                    url: r
                });
            }, 1800);
        }
    }) : "error" == a && wx.showModal({
        content: e,
        showCancel: !1,
        complete: function() {
            r && wx[i]({
                url: r
            });
        }
    });
}, util.user = util.getUserInfo, util.showLoading = function() {
    wx.getStorageSync("isShowLoading") && (wx.hideLoading(), wx.setStorageSync("isShowLoading", !1)), 
    wx.showLoading({
        title: "加载中",
        complete: function() {
            wx.setStorageSync("isShowLoading", !0);
        },
        fail: function() {
            wx.setStorageSync("isShowLoading", !1);
        }
    });
}, util.showImage = function(e) {
    var t = e ? e.currentTarget.dataset.preview : "";
    if (!t) return !1;
    wx.previewImage({
        urls: [ t ]
    });
}, util.parseContent = function(e) {
    if (!e) return e;
    var t = [ "\ud83c[\udf00-\udfff]", "\ud83d[\udc00-\ude4f]", "\ud83d[\ude80-\udeff]" ], a = e.match(new RegExp(t.join("|"), "g"));
    if (a) for (var n in a) e = e.replace(a[n], "[U+" + a[n].codePointAt(0).toString(16).toUpperCase() + "]");
    return e;
}, util.date = function() {
    this.isLeapYear = function(e) {
        return 0 == e.getYear() % 4 && (e.getYear() % 100 != 0 || e.getYear() % 400 == 0);
    }, this.dateToStr = function(e, t) {
        e = arguments[0] || "yyyy-MM-dd HH:mm:ss", t = arguments[1] || new Date();
        var a = e, n = [ "日", "一", "二", "三", "四", "五", "六" ];
        return a = a.replace(/yyyy|YYYY/, t.getFullYear()), a = a.replace(/yy|YY/, t.getYear() % 100 > 9 ? (t.getYear() % 100).toString() : "0" + t.getYear() % 100), 
        a = a.replace(/MM/, t.getMonth() > 9 ? t.getMonth() + 1 : "0" + (t.getMonth() + 1)), 
        a = a.replace(/M/g, t.getMonth()), a = a.replace(/w|W/g, n[t.getDay()]), a = a.replace(/dd|DD/, t.getDate() > 9 ? t.getDate().toString() : "0" + t.getDate()), 
        a = a.replace(/d|D/g, t.getDate()), a = a.replace(/hh|HH/, t.getHours() > 9 ? t.getHours().toString() : "0" + t.getHours()), 
        a = a.replace(/h|H/g, t.getHours()), a = a.replace(/mm/, t.getMinutes() > 9 ? t.getMinutes().toString() : "0" + t.getMinutes()), 
        a = a.replace(/m/g, t.getMinutes()), a = a.replace(/ss|SS/, t.getSeconds() > 9 ? t.getSeconds().toString() : "0" + t.getSeconds()), 
        a = a.replace(/s|S/g, t.getSeconds());
    }, this.dateAdd = function(e, t, a) {
        switch (a = arguments[2] || new Date(), e) {
          case "s":
            return new Date(a.getTime() + 1e3 * t);

          case "n":
            return new Date(a.getTime() + 6e4 * t);

          case "h":
            return new Date(a.getTime() + 36e5 * t);

          case "d":
            return new Date(a.getTime() + 864e5 * t);

          case "w":
            return new Date(a.getTime() + 6048e5 * t);

          case "m":
            return new Date(a.getFullYear(), a.getMonth() + t, a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds());

          case "y":
            return new Date(a.getFullYear() + t, a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds());
        }
    }, this.dateDiff = function(e, t, a) {
        switch (e) {
          case "s":
            return parseInt((a - t) / 1e3);

          case "n":
            return parseInt((a - t) / 6e4);

          case "h":
            return parseInt((a - t) / 36e5);

          case "d":
            return parseInt((a - t) / 864e5);

          case "w":
            return parseInt((a - t) / 6048e5);

          case "m":
            return a.getMonth() + 1 + 12 * (a.getFullYear() - t.getFullYear()) - (t.getMonth() + 1);

          case "y":
            return a.getFullYear() - t.getFullYear();
        }
    }, this.strToDate = function(dateStr) {
        var data = dateStr, reCat = /(\d{1,4})/gm, t = data.match(reCat);
        return t[1] = t[1] - 1, eval("var d = new Date(" + t.join(",") + ");"), d;
    }, this.strFormatToDate = function(e, t) {
        var a = 0, n = -1, r = t.length;
        (n = e.indexOf("yyyy")) > -1 && n < r && (a = t.substr(n, 4));
        var i = 0;
        (n = e.indexOf("MM")) > -1 && n < r && (i = parseInt(t.substr(n, 2)) - 1);
        var o = 0;
        (n = e.indexOf("dd")) > -1 && n < r && (o = parseInt(t.substr(n, 2)));
        var s = 0;
        ((n = e.indexOf("HH")) > -1 || (n = e.indexOf("hh")) > 1) && n < r && (s = parseInt(t.substr(n, 2)));
        var u = 0;
        (n = e.indexOf("mm")) > -1 && n < r && (u = t.substr(n, 2));
        var c = 0;
        return (n = e.indexOf("ss")) > -1 && n < r && (c = t.substr(n, 2)), new Date(a, i, o, s, u, c);
    }, this.dateToLong = function(e) {
        return e.getTime();
    }, this.longToDate = function(e) {
        return new Date(e);
    }, this.isDate = function(e, t) {
        null == t && (t = "yyyyMMdd");
        var a = t.indexOf("yyyy");
        if (-1 == a) return !1;
        var n = e.substring(a, a + 4), r = t.indexOf("MM");
        if (-1 == r) return !1;
        var i = e.substring(r, r + 2), o = t.indexOf("dd");
        if (-1 == o) return !1;
        var s = e.substring(o, o + 2);
        return !(!isNumber(n) || n > "2100" || n < "1900") && (!(!isNumber(i) || i > "12" || i < "01") && !(s > getMaxDay(n, i) || s < "01"));
    }, this.getMaxDay = function(e, t) {
        return 4 == t || 6 == t || 9 == t || 11 == t ? "30" : 2 == t ? e % 4 == 0 && e % 100 != 0 || e % 400 == 0 ? "29" : "28" : "31";
    }, this.isNumber = function(e) {
        return /^\d+$/g.test(e);
    }, this.toArray = function(e) {
        e = arguments[0] || new Date();
        var t = Array();
        return t[0] = e.getFullYear(), t[1] = e.getMonth(), t[2] = e.getDate(), t[3] = e.getHours(), 
        t[4] = e.getMinutes(), t[5] = e.getSeconds(), t;
    }, this.datePart = function(e, t) {
        t = arguments[1] || new Date();
        var a = "", n = [ "日", "一", "二", "三", "四", "五", "六" ];
        switch (e) {
          case "y":
            a = t.getFullYear();
            break;

          case "M":
            a = t.getMonth() + 1;
            break;

          case "d":
            a = t.getDate();
            break;

          case "w":
            a = n[t.getDay()];
            break;

          case "ww":
            a = t.WeekNumOfYear();
            break;

          case "h":
            a = t.getHours();
            break;

          case "m":
            a = t.getMinutes();
            break;

          case "s":
            a = t.getSeconds();
        }
        return a;
    }, this.maxDayOfDate = function(e) {
        (e = arguments[0] || new Date()).setDate(1), e.setMonth(e.getMonth() + 1);
        var t = e.getTime() - 864e5;
        return new Date(t).getDate();
    };
}, module.exports = util;