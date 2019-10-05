var t = getApp(), a = t.siteInfo.uniacid;

Page({
    data: {
        indicatorDots: !1,
        autoplay: !1,
        interval: 5e3,
        duration: 1e3,
        winWidth: 0,
        winHeight: 0,
        swiArr: [ "动态", "生活", "教育" ],
        iconPath: "../images/map.png",
        id: 0,
        width: 35,
        height: 45,
        latitude: 0,
        longitude: 0,
        gs_name: "",
        c_time: 0,
        bg_img: ""
    },
    onLoad: function() {
        var e = new Date(), n = this.formatDate(e), i = this;
        t.util.request({
            url: "entry/wxapp/Houseinfo",
            data: {
                m: "monaiapp_house",
                uniacid: a
            },
            cachetime: "0",
            success: function(t) {
                i.setData({
                    detile: t.data.data.company_info,
                    bg_img: t.data.data.picture.project_img,
                    nes: t.data.data.product_detail,
                    c_time: n,
                    latitude: t.data.data.companyInfo.y,
                    longitude: t.data.data.companyInfo.x,
                    golat: t.data.data.companyInfo.y,
                    gs_name: t.data.data.companyInfo.name,
                    banq: t.data.data.companyInfo.copyright,
                    markers: [ {
                        id: "1",
                        width: 15,
                        height: 20,
                        title: t.data.data.companyInfo.name,
                        latitude: t.data.data.companyInfo.y,
                        longitude: t.data.data.companyInfo.x
                    } ]
                });
            }
        }), wx.getSystemInfo({
            success: function(t) {
                i.setData({
                    winWidth: t.windowWidth,
                    winHeight: t.windowHeight
                });
            }
        }), i.setData({
            currentTab: 0
        });
    },
    formatDate: function(t) {
        var a = t.getFullYear(), e = t.getMonth() + 1, n = t.getDate();
        t.getHours(), t.getMinutes(), t.getSeconds();
        return a + "-" + e + "-" + n;
    },
    bindChange: function(t) {
        this.setData({
            currentTab: t.detail.current
        });
    },
    swichNav: function(t) {
        var a = this;
        if (this.data.currentTab === t.target.dataset.current) return !1;
        a.setData({
            currentTab: t.target.dataset.current
        });
    },
    changeIndicatorDots: function(t) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        });
    },
    changeAutoplay: function(t) {
        this.setData({
            autoplay: !this.data.autoplay
        });
    },
    intervalChange: function(t) {
        this.setData({
            interval: t.detail.value
        });
    },
    durationChange: function(t) {
        this.setData({
            duration: t.detail.value
        });
    },
    numberTime: function(t) {
        var a = 1e3 * t, e = new Date(a);
        return e.getFullYear() + "/" + ((e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1) + "/") + (e.getDate() < 10 ? "0" + e.getDate() : e.getDate());
    },
    controltap: function() {
        var t = this;
        wx.getLocation({
            type: "gcj02",
            success: function(a) {
                wx.openLocation({
                    latitude: parseFloat(t.data.latitude),
                    longitude: parseFloat(t.data.longitude),
                    scale: 28,
                    gs_name: t.data.gs_name
                });
            }
        });
    },
    yue: function() {
        wx.navigateTo({
            url: "../order/order"
        });
    },
    news: function() {
        wx.navigateTo({
            url: "../newsdetile/newsdetile?project_id=" + this.data.detile.project_id
        });
    },
    toast: function() {
        wx.navigateTo({
            url: "../protocol/protocol"
        });
    }
});