module.exports = {
    PAGE_WORK: "/pages/logs/logs",
    HOST_WORK: "http://work.artand.cn/",
    HOST_HEAD: "http://head.artand.cn/",
    HOST_IOS: "http://ios1.artand.cn/",
    HOT: "discover/work/hot",
    LATEST: "discover/work/new",
    get: function(t) {
        return new Promise(function(n, e) {
            wx.request({
                url: t,
                headers: {
                    "Content-Type": "application/json"
                },
                success: function(t) {
                    n(t);
                },
                fail: function(t) {
                    e(t);
                }
            });
        });
    }
};