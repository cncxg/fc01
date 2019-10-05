var a = getApp();

Page({
    data: {
        indicatorDots: !1,
        autoplay: !1,
        interval: 8e3,
        duration: 1e3,
        tel: 0,
        bg_img: "",
        gs_name: "",
        info: [],
        banner: []
    },
    onLoad: function() {
        var t = this;
        t.setData({
            status: !0
        });
        var e = a.siteInfo.uniacid;
        a.util.request({
            url: "entry/wxapp/house",
            data: {
                m: "monaiapp_house",
                uniacid: e
            },
            cachetime: "30",
            success: function(a) {
                wx.setNavigationBarTitle({
                    title: a.data.data.info.name + ""
                }), t.setData({
                    bg_img: a.data.data.picture.background_img,
                    picture: a.data.data.picture,
                    tag: a.data.data.tag,
                    detile: a.data.data.info,
                    gs_name: a.data.data.info.name,
                    tel: a.data.data.info.phone,
                    banner: a.data.data.banner
                });
            }
        }), wx.getStorageSync("house_id") > 0 || a.util.request({
            url: "entry/wxapp/login",
            data: {
                m: "monaiapp_house",
                uniacid: wx.getStorageSync("uniacid"),
                re_id: wx.getStorageSync("re_id"),
                uid: wx.getStorageSync("uid")
            },
            cachetime: "0",
            success: function(a) {
                console.log(a.data.data), a.data.data > 8 && a.data.data < 32 && (wx.setStorageSync("house_id", a.data.data), 
                wx.showModal({
                    content: a.data.message,
                    showCancel: !1,
                    confirmColor: "#cc0000"
                }));
            }
        });
    },
    changeIndicatorDots: function(a) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        });
    },
    changeAutoplay: function(a) {
        this.setData({
            autoplay: !this.data.autoplay
        });
    },
    intervalChange: function(a) {
        this.setData({
            interval: a.detail.value
        });
    },
    durationChange: function(a) {
        this.setData({
            duration: a.detail.value
        });
    },
    yue: function() {
        wx.navigateTo({
            url: "../order/order"
        });
    },
    map: function() {
        var a = this, t = this.data.detile.y, e = this.data.detile.x;
        wx.getLocation({
            type: "gcj02",
            success: function(i) {
                var n = parseFloat(t), o = parseFloat(e);
                wx.openLocation({
                    latitude: n,
                    longitude: o,
                    scale: 28,
                    name: a.data.gs_name
                });
            }
        });
    },
    tel: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.tel
        });
    },
    service: function() {
        wx.navigateTo({
            url: "../service/service"
        });
    },
    tip: function() {
        wx.navigateTo({
            url: "../special/special"
        });
    },
    onShareAppMessage: function() {
        return {
            title: this.data.gs_name,
            desc: "最具优秀的房产企业",
            path: "/pages/index/index"
        };
    },
    onShow: function() {
        wx.setNavigationBarTitle({
            title: this.data.gs_name
        });
    }
});