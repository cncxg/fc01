var n = getApp();

Page({
    data: {
        log: []
    },
    onLoad: function(o) {
        var t = this;
        wx.request({
            url: n.data.url + "/company.Appoint/getAppoint.html",
            data: {
                token: wx.getStorageSync("token")
            },
            header: {
                "content-type": "application/json"
            },
            success: function(n) {
                t.setData({
                    log: n.data
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});