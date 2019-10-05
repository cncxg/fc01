var t = getApp();

Page({
    data: {
        list: []
    },
    onLoad: function(a) {
        var e = this;
        wx.request({
            url: "https://www.monainet.com/wechatapi/company.notice/getnotice.html",
            data: {
                token: wx.getStorageSync("token")
            },
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                for (var n = 0; n < a.data.length; n++) a.data[n].create_time = t.toDate(a.data[n].create_time);
                e.setData({
                    list: a.data
                });
            }
        });
    },
    childPage: function(t) {
        var a = t.currentTarget.dataset.id;
        console.log(a), wx.navigateTo({
            url: "../noticeInfo/noticeInfo?id=" + a,
            success: function(t) {}
        });
    }
});