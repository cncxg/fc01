var a = getApp(), t = a.siteInfo.uniacid;

Page({
    data: {
        show: !1
    },
    onLoad: function(e) {
        e.id;
        var i = this;
        a.util.request({
            url: "entry/wxapp/getnick",
            data: {
                m: "monaiapp_house",
                uniacid: t,
                uid: wx.getStorageSync("uid")
            },
            cachetime: "0",
            success: function(a) {
                1 == a.data.message ? i.setData({
                    logo: a.data.data.logo,
                    nickname: a.data.data.nickname,
                    infoone: a.data.data.info
                }) : i.setData({
                    user: a.data.data.member,
                    info: a.data.data.info
                });
            }
        });
    },
    toast: function() {
        wx.navigateTo({
            url: "../mymessage_detile/mymessage_detile?toUser=" + wx.getStorageSync("uid")
        });
    },
    todetails: function() {
        wx.navigateTo({
            url: "/pages/mymessage/mydetails/index"
        });
    },
    calculator: function() {
        wx.switchTab({
            url: "/pages/calculator/index"
        });
    },
    appointment: function() {
        wx.navigateTo({
            url: "/pages/order/order"
        });
    },
    dongtai: function() {
        wx.switchTab({
            url: "/pages/detile/detile"
        });
    },
    building: function() {
        wx.switchTab({
            url: "/pages/housetype/housetype"
        });
    },
    code: function() {
        this.setData({
            show: !0
        });
    },
    show: function() {
        this.setData({
            show: !1
        });
    }
});