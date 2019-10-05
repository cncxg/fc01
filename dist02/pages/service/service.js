var e = getApp();

Page({
    data: {},
    onLoad: function(a) {
        var t = this, i = e.siteInfo.uniacid;
        e.util.request({
            url: "entry/wxapp/service",
            data: {
                m: "monaiapp_house",
                uniacid: i
            },
            cachetime: "0",
            success: function(e) {
                t.setData({
                    user: e.data.data
                });
            }
        });
    },
    tel: function(e) {
        var a = e.currentTarget.dataset.tel;
        console.log(a), wx.makePhoneCall({
            phoneNumber: a
        });
    },
    user: function(e) {
        var a = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../servicedetile/servicedetile?id=" + a
        });
    }
});