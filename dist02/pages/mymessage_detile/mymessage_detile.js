var e = "https://www.monainet.com";

wx.setStorageSync("storeId", 74), Page({
    data: {
        ma_url: "",
        toUid: 0,
        to: 0,
        scene: "",
        maA: []
    },
    onLoad: function(e) {
        var t = this, n = decodeURIComponent(e.scene);
        if ("undefined" != n) {
            var t = this, a = wx.getStorageSync("token");
            return this.setData({
                toUid: n
            }), this.uInfo(n), a ? t.newBind(n) : t.iflogin(n), !1;
        }
        if (e.re_id) return this.uInfo(e.re_id), this.setData({
            toUid: e.re_id
        }), !1;
        e.toUser && (this.setData({
            toUid: e.toUser
        }), this.uInfo(e.toUser));
    },
    uInfo: function(t) {
        var n = this;
        wx.request({
            url: e + "/wechatapi/house.house/userInfo.html",
            data: {
                store_id: wx.getStorageSync("storeId"),
                token: wx.getStorageSync("token"),
                u_id: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                n.setData({
                    user: t.data,
                    http_url: e,
                    ma_url: t.data.ma_url,
                    maA: [ t.data.ma_url ]
                });
            }
        });
    },
    newBind: function(t) {
        wx.request({
            url: e + "/wechatapi/house.house/updateUser.html",
            data: {
                store_id: wx.getStorageSync("storeId"),
                token: wx.getStorageSync("token"),
                u_id: wx.getStorageSync("userId"),
                re_id: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                wx.switchTab({
                    url: "../index/index"
                });
            }
        });
    },
    iflogin: function(e) {
        var t = this;
        wx.login({
            success: function(n) {
                n.code && wx.getUserInfo({
                    success: function(a) {
                        wx.request({
                            url: "https://www.monainet.com/wechatapi/house.Login/login.html",
                            data: {
                                code: n.code,
                                nickName: a.userInfo.nickName,
                                avatarUrl: a.userInfo.avatarUrl,
                                sex: a.userInfo.gender,
                                store_id: wx.getStorageSync("storeId"),
                                city: a.userInfo.city ? a.userInfo.city : ""
                            },
                            header: {
                                "content-type": "application/json"
                            },
                            success: function(n) {
                                var o = n.data;
                                wx.setStorageSync("userId", o.member_list_id), wx.setStorageSync("token", o.token), 
                                wx.setStorageSync("userInfo", a.userInfo), t.newBind(e);
                            }
                        });
                    }
                });
            }
        });
    },
    onShareAppMessage: function(t) {
        var n = this;
        return {
            imageUrl: e + n.data.ma_url,
            path: "/pages/index/index?re_id=" + n.data.toUid
        };
    },
    imgYu: function(t) {
        for (var n = [], a = t.currentTarget.dataset.src, o = t.currentTarget.dataset.list, r = 0; r < o.length; r++) n.push(e + o[r]);
        wx.previewImage({
            current: e + a,
            urls: n
        });
    }
});