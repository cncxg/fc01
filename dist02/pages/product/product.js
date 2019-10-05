var t = "https://www.monainet.com", a = 2;

Page({
    data: {
        _num: "",
        navigation: "",
        cont: "",
        imgurl: "",
        slider: "",
        swiperCurrent: 0
    },
    onLoad: function(t) {},
    onShow: function() {
        var a = wx.getStorageSync("cpid");
        wx.setStorageSync("cpid", null);
        var e = this;
        e.setData({
            imgurl: t
        }), e.setData({
            _num: a
        }), e.getBanner(), a ? wx.request({
            url: t + "/wechatapi/company.product/getNavigation.html",
            data: {
                token: wx.getStorageSync("token"),
                store_id: wx.getStorageSync("storeId")
            },
            success: function(n) {
                n.data.length > 0 && (e.setData({
                    navigation: n.data,
                    _num: a
                }), wx.request({
                    url: t + "/wechatapi/company.product/getNavigationContent.html",
                    data: {
                        token: wx.getStorageSync("token"),
                        leftid: 1,
                        navid: a,
                        store_id: wx.getStorageSync("storeId")
                    },
                    success: function(t) {
                        e.setData({
                            cont: t.data
                        });
                    }
                }));
            }
        }) : wx.request({
            url: t + "/wechatapi/company.product/getNavigation.html",
            data: {
                token: wx.getStorageSync("token"),
                store_id: wx.getStorageSync("storeId")
            },
            success: function(a) {
                a.data.length > 0 && (e.setData({
                    navigation: a.data,
                    _num: a.data[0].id
                }), wx.request({
                    url: t + "/wechatapi/company.product/getNavigationContent.html",
                    data: {
                        token: wx.getStorageSync("token"),
                        leftid: 1,
                        navid: a.data[0].id,
                        store_id: wx.getStorageSync("storeId")
                    },
                    success: function(t) {
                        e.setData({
                            cont: t.data
                        });
                    }
                }));
            }
        });
    },
    swiperChange: function(t) {
        this.setData({
            swiperCurrent: t.detail.current
        });
    },
    onReachBottom: function() {
        var e = this;
        console.log(a), wx.request({
            url: t + "/wechatapi/company.product/getNavigationContent.html",
            data: {
                token: wx.getStorageSync("token"),
                store_id: wx.getStorageSync("storeId"),
                leftid: a,
                navid: e.data._num
            },
            success: function(t) {
                var n = t.data.length, o = e.data.cont;
                a++;
                for (var c = 0; c < n; c++) o.push(t.data[c]);
                e.setData({
                    cont: o
                });
            }
        });
    },
    selected: function(a) {
        var e = this;
        e.setData({
            _num: a.target.dataset.show
        }), wx.request({
            url: t + "/wechatapi/company.product/getNavigationContent.html",
            data: {
                token: wx.getStorageSync("token"),
                navid: a.target.dataset.show,
                leftid: 1,
                store_id: wx.getStorageSync("storeId")
            },
            success: function(t) {
                e.setData({
                    cont: t.data
                });
            }
        });
    },
    getBanner: function() {
        var a = this;
        wx.request({
            url: t + "/wechatapi/company.product/productList.html",
            data: {
                user_id: wx.getStorageSync("userId"),
                token: wx.getStorageSync("token"),
                store_id: wx.getStorageSync("storeId")
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                a.setData({
                    slider: t.data.data.images
                }), a.setData({
                    product: t.data.data.product
                }), a.setData({
                    company: t.data.data.company
                });
            }
        });
    }
});