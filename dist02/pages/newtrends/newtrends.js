var a = getApp(), t = a.siteInfo.uniacid;

Page({
    data: {},
    onLoad: function(n) {
        var e = this;
        a.util.request({
            url: "entry/wxapp/Allsale",
            data: {
                m: "monaiapp_house",
                uniacid: t,
                uid: wx.getStorageSync("uid")
            },
            cachetime: "30",
            success: function(t) {
                console.log(t);
                for (var n in t.data.data) t.data.data[n].open_time = a.toDate(t.data.data[n].open_time), 
                t.data.data[n].deliver_time = a.toDate(t.data.data[n].deliver_time);
                e.setData({
                    sale: t.data.data
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