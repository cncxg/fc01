var a = getApp();

Page({
    data: {
        duration: 1e3,
        tel: 0,
        num: 5,
        bg_img: "",
        gs_name: ""
    },
    onLoad: function(t) {
        var e = this, n = a.siteInfo.uniacid;
        a.util.request({
            url: "entry/wxapp/house",
            data: {
                m: "monaiapp_house",
                uniacid: n
            },
            cachetime: "0",
            success: function(a) {
                e.setData({
                    bg_img: a.data.data.picture.count_down_img,
                    picture: a.data.data.picture,
                    num: a.data.data.picture.open_time
                });
                var t = setInterval(function() {
                    e.data.num--, 0 == e.data.num && (wx.switchTab({
                        url: "../index/index"
                    }), clearInterval(t)), e.setData({
                        num: e.data.num
                    });
                }, 1e3);
            }
        });
    }
});