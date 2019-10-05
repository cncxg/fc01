var e = require("we7/resource/js/util.js");

App({
    siteInfo: {
        uniacid: "22",
        acid: "22",
        version: "1.0",        siteroot:"https://bbs.kaimle.com/app/index.php",
        method_design: "3"
    },
    data: {},
    util: e,
    onLaunch: function(t) {
        e.getUserInfo();
    },
    toDate: function(e) {
        var t = 1e3 * e, n = new Date(t);
        return n.getFullYear() + "/" + ((n.getMonth() + 1 < 10 ? "0" + (n.getMonth() + 1) : n.getMonth() + 1) + "/") + (n.getDate() < 10 ? "0" + n.getDate() : n.getDate());
    },
    onShow: function(e) {
        if (e.query.scene) {
            var t = decodeURIComponent(e.query.scene);
            if ("undefined" != t) {
                var n = t.substr(2);
                wx.setStorageSync("re_id", n);
            }
        } else wx.setStorageSync("re_id", 0);
    }
});