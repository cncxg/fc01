Page(function(e, n, t) {
    return n in e ? Object.defineProperty(e, n, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[n] = t, e;
}({
    data: {
        userHeaderUrl: "../image/tip.jpg",
        optionNamas: [ "我的预约" ],
        optionIcons: [ "../image/mine_1.png", "../image/mine_4.png", "../image/mine_6.png" ],
        gettip: []
    },
    onLoad: function(e) {
        var n = this, t = wx.getStorageSync("userInfo");
        n.setData({
            userHeaderUrl: t.avatarUrl,
            name: t.nickName
        }), wx.request({
            url: "https://www.monainet.com/api/v1/gettip",
            data: {
                store_id: wx.getStorageSync("storeId")
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                n.setData({
                    gettip: e.data
                });
            }
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    makePhone: function(e) {
        var n = e.currentTarget.dataset.phone;
        wx.showModal({
            title: "提示",
            content: "你将拨打商家电话" + n,
            success: function(e) {
                e.confirm && wx.makePhoneCall({
                    phoneNumber: n
                });
            }
        });
    },
    selectoption: function(e) {
        wx.navigateTo({
            url: "./log/log"
        });
    },
    navigationTo: function(e, n) {
        console.log("跳转../" + e + "/" + e + n), wx.navigateTo({
            url: "../" + e + "/" + e + n,
            success: function(e) {}
        });
    },
    goOrder: function() {
        wx.navigateTo({
            url: "./../../orderManage/orderManage"
        });
    }
}, "onPullDownRefresh", function() {
    wx.showNavigationBarLoading(), setTimeout(function() {
        wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
    }, 1500);
}));