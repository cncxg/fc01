var t = getApp().data.url, a = getApp();

Page({
    data: {
        notice: [],
        description: ""
    },
    onLoad: function(e) {
        var n = this;
        wx.request({
            url: t + "/company.map/getMap.html",
            data: {
                token: wx.getStorageSync("token")
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                var e = a.towxml.toJson(t.data.description, "markdown");
                n.setData({
                    notice: t.data,
                    description: e
                });
            }
        });
    }
});