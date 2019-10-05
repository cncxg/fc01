var a = getApp();

Page({
    data: {
        zan: 0,
        countzan: 0,
        http_url: a.data.imgurl
    },
    onLoad: function(t) {
        var e = t.id, d = this, n = a.siteInfo.uniacid;
        a.util.request({
            url: "entry/wxapp/serviceuser",
            data: {
                m: "monaiapp_house",
                uniacid: n,
                id: e,
                uid: wx.getStorageSync("uid")
            },
            cachetime: "0",
            success: function(a) {
                d.setData({
                    user: a.data.data.adv,
                    conutZan: parseInt(a.data.data.adv.fbulous),
                    adv: a.data.data.res,
                    adviser_img: a.data.data.picture.adviser_img,
                    logo: a.data.data.logo.logo,
                    project: a.data.data.project
                });
            }
        });
    },
    tel: function(a) {
        var t = a.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    zan: function(t) {
        var e = this, d = a.siteInfo.uniacid, n = t.currentTarget.dataset.id;
        a.util.request({
            url: "entry/wxapp/zan",
            data: {
                m: "monaiapp_house",
                uniacid: d,
                u_id: n,
                uid: wx.getStorageSync("uid")
            },
            cachetime: 0,
            success: function(a) {
                console.log(a.data.data), 20 == a.data.data ? (e.setData({
                    conutZan: e.data.conutZan + 1
                }), e.box("点赞成功")) : 10 == a.data.data ? e.box(a.data.message) : 30 == a.data.data ? e.box(a.data.message) : 40 == a.data.data && e.box(a.data.message);
            }
        });
    },
    stito: function() {
        wx.switchTab({
            url: "../detile/detile"
        });
    },
    box: function(a) {
        wx.showModal({
            content: a + "",
            showCancel: !1,
            confirmColor: "#cc0000"
        });
    }
});