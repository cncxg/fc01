var a = getApp(), t = a.siteInfo.uniacid;

Page({
    data: {},
    onLoad: function(e) {
        e.id;
        var s = this;
        a.util.request({
            url: "entry/wxapp/Mymessage",
            data: {
                m: "monaiapp_house",
                uniacid: t,
                uid: wx.getStorageSync("uid")
            },
            cachetime: "30",
            success: function(a) {
                1 == a.data.data.sex ? a.data.data.sex = "男" : 2 == a.data.sex ? a.data.data.sex = "女" : a.data.data.sex = "保密", 
                s.setData({
                    user: a.data.data
                });
            }
        });
    },
    toast: function() {
        wx.navigateTo({
            url: "../mymessage_detile/mymessage_detile?toUser=" + wx.getStorageSync("userId")
        });
    }
});